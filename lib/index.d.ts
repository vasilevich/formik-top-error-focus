interface IFormikErrorScrollToTopProps {
    topElementOffset: number;
    getElement: (...errors: string[]) => HTMLElement;
    onFocusedElement: (element: HTMLElement) => void;
    onFocusedDelay: number;
    validationTriggerCondition: (errors: any, isSubmitting: boolean, isValidating: boolean) => boolean;
}
declare const formikErrorScrollToTop: {
    (props: IFormikErrorScrollToTopProps): any;
    defaultProps: {
        topElementOffset: number;
        getElement: (...errors: string[]) => HTMLElement;
        onFocusedElement: (element: HTMLElement) => void;
        onFocusedDelay: number;
        validationTriggerCondition: (errors: any, isSubmitting: boolean, isValidating: boolean) => boolean;
    };
};
export default formikErrorScrollToTop;
