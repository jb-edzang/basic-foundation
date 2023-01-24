const { default: clsx } = require("clsx")

const variants = {
  danger: "border-red-600 bg-red-100 text-red-700",
  info: "border-blue-600 bg-blue-100 text-blue-700",
}

const Alert = (props) => {
  const {
    as: Component = "p",
    className,
    variant = "danger",
    ...otherProps
  } = props

  return (
    <Component
      className={clsx("border-2 p-4", variants[variant], className)}
      {...otherProps}
    />
  )
}

export default Alert
