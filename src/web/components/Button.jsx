import clsx from "clsx"

const Button = (props) => {
  const { className, ...otherProps } = props

  return (
    <button
      className={clsx(
        "bg-blue-600 px-4 py-2 text-2xl font-medium text-white active:bg-blue-700",
        className
      )}
      {...otherProps}
    />
  )
}

export default Button
