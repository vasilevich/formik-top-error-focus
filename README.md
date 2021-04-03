[![npm version](https://badge.fury.io/js/formik-top-error-focus.svg)](https://www.npmjs.com/package/formik-top-error-focus)

# formik-top-error-focus

A simple dependency-less other than react and formik React component that automatically scrolls to the top-most visible
formik error.   
I tried to use the existing ones from NPM however none of them seemed to work for me out of the box. So I decided to
publish this tiny([2.68 KB](https://github.com/vasilevich/formik-top-error-focus/blob/master/lib/index.js) before gzip)
module instead.

##  * Install.

```bash
yarn add formik-top-error-focus
```

or

```bash
npm install formik-top-error-focus
```

##  * Props

In my opinion, the defaults should fit most usage needs.    
However for your convenience I added some customize ability through the use of props:

```tsx
interface IFormikErrorScrollToTopProps {
    /**
     * The offset above the scrolled to element, to add even more scroll
     * Default : 130px
     */
    topElementOffset: number;
    /**
     * allows the user of the code to ovveride with their own error choosing logic,
     * Default: gets highest visible error element.
     * @param errors
     */
    getElement: (...errors: string[]) => HTMLElement;
    /**
     * What to do with the element?
     * default action is to just element.focus()
     * @param element
     */
    onFocusedElement: (element: HTMLElement) => void;
    /**
     * The delay used before the logic is activated, to scroll not instantly.
     * Default: 500 ms
     */
    onFocusedDelay: number;
    /**
     * On what condition to trigger the scroll logic?
     * Default: isSubmitting && !isValidating
     * @param errors
     * @param isSubmitting
     * @param isValidating
     */
    validationTriggerCondition: (errors: any, isSubmitting: boolean, isValidating: boolean) => boolean;

}
```

##  * Usage Example in your formik form by adding '<formikErrorScrollToTop/>' shown below

```tsx
import * as React from 'react';
import FormikErrorScrollToTop from 'formik-top-error-focus';

const formikExampleForm = (props) => {
    return (
        <Formik
            initialValues={{
                a: undefined,
                b: undefined,
                c: undefined,
            }}
            validationSchema={
                Yup.object({
                    a: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    b: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    c: Yup.string().email('Invalid email address').required('Required'),
                })
            }
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(false);
            }}
            initialTouched={objectArrayTools(props.ticketDetails).map(() => true).toNormalObject()}
        >
            {({submitForm, isSubmitting, setFieldValue, values, touched, errors, submitCount}) => (
                <Form translate={null}>
                    <Field name="a" type="text"/>
                    <Field name="b" type="text"/>
                    <Field name="c" type="text"/>
                    <Button
                        className="nextButton"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                        ref={props.setSubmitRef}
                    >
                        submit
                    </Button>
                    <FormikErrorScrollToTop/>
                </Form>
            )}
        </Formik>
    );
};

export default formikExampleForm;

```

#### Thank you for giving me a chance, Feel free to contribute and fix.

#### And most important of all, Enjoy!

