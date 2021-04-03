"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const formik_1 = require("formik");
const isVisible = (element) => !(window.getComputedStyle(element).display === "none");
const getElementByKey = (key) => {
    const selector = `[name=${key}]`;
    let errorElement = document.querySelector(selector);
    if (!errorElement) {
        errorElement = document.getElementById(key);
    }
    if (!errorElement) {
        return null;
    }
    while (!isVisible(errorElement)) {
        if (errorElement = errorElement.previousElementSibling) {
            break;
        }
        else if (errorElement = errorElement.parentElement) {
            break;
        }
    }
    return errorElement;
};
const getHighestElement = (...errors) => {
    const allElements = errors
        .map(error => getElementByKey(error))
        .filter(element => element)
        .sort((element1, element2) => element1.getBoundingClientRect().top - element2.getBoundingClientRect().top);
    if (allElements.length) {
        return allElements[0];
    }
};
const getElement = (...errors) => {
    return getHighestElement(...errors);
};
const onFocusedElement = (element) => {
    element.focus();
};
const validationTriggerCondition = (errors, isSubmitting, isValidating) => {
    return isSubmitting && !isValidating;
};
const formikErrorScrollToTop = (props) => {
    const { errors, isSubmitting, isValidating } = formik_1.useFormikContext();
    react_1.useEffect(() => {
        if (validationTriggerCondition(errors, isSubmitting, isValidating)) {
            const keys = Object.keys(errors);
            if (keys.length > 0) {
                const errorElement = props.getElement(...keys);
                if (errorElement) {
                    const y = errorElement.getBoundingClientRect().top + window.pageYOffset + props.topElementOffset;
                    const isSmoothScrollSupported = "scrollBehavior" in document.documentElement.style;
                    if (isSmoothScrollSupported) {
                        window.scrollTo({ top: y, behavior: "smooth" });
                    }
                    else {
                        document.body.scrollTop = y;
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
exports.default = formikErrorScrollToTop;
//# sourceMappingURL=index.js.map