import {useEffect} from 'react';
import {useFormikContext} from 'formik';


interface IFormikErrorScrollToTopProps {
    topElementOffset: number;

    getElement: (...errors: string[]) => HTMLElement;

    onFocusedElement: (element: HTMLElement) => void;

    onFocusedDelay: number;

    validationTriggerCondition: (errors: any, isSubmitting: boolean, isValidating: boolean) => boolean;

}

/**
 * Is element visible, just like it is done inside jQuery
 * @param element
 */
const isVisible = (element: any) => !(window.getComputedStyle(element).display === "none");
/**
 * get element by name if that fails, then id
 * @param key
 */
const getElementByKey = (key: string): HTMLElement => {
    const selector = `[name=${key}]`;
    let errorElement: any = document.querySelector(selector);
    if (!errorElement) {
        errorElement = document.getElementById(key);
    }
    /**
     * No element found. so return null
     */
    if (!errorElement) {
        return null;
    }
    /**
     * Element is hidden? attempt to get its siblings/parents
     */
    while (!isVisible(errorElement)) {
        /**
         * Attempt to get previous sibling
         */
        if (errorElement = errorElement.previousElementSibling) {
            break;
        }
        /**
         * Attempt to get parent if no sibling found
         */
        else if (errorElement = errorElement.parentElement) {
            break;
        }
    }
    return errorElement;
}
/**
 * Get highest visible error element using element.getBoundingClientRect().top
 * @param errors
 */
const getHighestElement = (...errors: string[]): HTMLElement => {
    const allElements = errors
        .map(error => getElementByKey(error))
        .filter(element => element)
        .sort((element1, element2) => element1.getBoundingClientRect().top - element2.getBoundingClientRect().top);
    if (allElements.length) {
        return allElements[0];
    }
};

/**
 * allows the user of the code to ovveride with their own error choosing logic,
 * gets highest element by default
 * @param errors
 */
const getElement = (...errors: string[]): HTMLElement => {
    return getHighestElement(...errors);
};

/**
 * What to do with the element?
 * default action is to just element.focus()
 * @param element
 */
const onFocusedElement = (element: HTMLElement): void => {
    element.focus();
}
/**
 * On what condition to trigger the scroll logic?
 * @param errors
 * @param isSubmitting
 * @param isValidating
 */
const validationTriggerCondition = (errors: any, isSubmitting: boolean, isValidating: boolean) => {
    return isSubmitting && !isValidating;
}

const formikErrorScrollToTop = (props: IFormikErrorScrollToTopProps): any => {
    const {errors, isSubmitting, isValidating} = useFormikContext();
    useEffect(() => {
        if (validationTriggerCondition(errors, isSubmitting, isValidating)) {
            const keys = Object.keys(errors);
            if (keys.length > 0) {
                const errorElement = props.getElement(...keys);
                if (errorElement) {
                    const y = errorElement.getBoundingClientRect().top + window.pageYOffset + props.topElementOffset;
                    const isSmoothScrollSupported = "scrollBehavior" in document.documentElement.style;
                    if (isSmoothScrollSupported) {
                        // not on IE/Edge
                        window.scrollTo({top: y, behavior: "smooth"});
                    } else {
                        // for Edge
                        document.body.scrollTop = y;
                        // use an offset to compensate for the fixed header
                        document.documentElement.scrollTop = y;
                    }
                    setTimeout(() => onFocusedElement, props.onFocusedDelay);
                }
            }
        }
    }, [errors, isSubmitting, isValidating]);

    return null;
};

formikErrorScrollToTop.defaultProps = {
    topElementOffset: -130,
    getElement,
    onFocusedElement,
    onFocusedDelay: 500,
    validationTriggerCondition,

};

export default formikErrorScrollToTop;
