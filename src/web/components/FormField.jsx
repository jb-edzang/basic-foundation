import clsx from "clsx"
import { ErrorMessage, Field } from "formik"

const FormField = (props) => {
  const { label, name, className, ...otherProps } = props

  return (
    <label className={clsx("flex flex-col gap-2", className)}>
      <span className="text-sm font-medium">{label}</span>
      <Field
        name={name}
        {...otherProps}
        className="border-2 px-4 py-2 focus:border-blue-600 focus:outline-0"
      />
      <ErrorMessage name={name} className="text-sm font-medium text-red-600" />
    </label>
  )
}

export default FormField
