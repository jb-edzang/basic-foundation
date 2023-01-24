import clsx from "clsx"
import { Form as FormikForm } from "formik"

const Form = (props) => {
  const { className, ...otherProps } = props

  return (
    <FormikForm
      {...otherProps}
      className={clsx("flex flex-col gap-4", className)}
      noValidate
    />
  )
}

export default Form
