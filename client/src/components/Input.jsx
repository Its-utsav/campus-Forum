/**
 *
 * @param {{
 *  label?:string
 *  divClassName?:string
 *  inputClassName?:string
 * }
 * & import("react").InputHTMLAttributes<HtmlHTMLAttributes>} props
 */
export default function Input(props) {
  const { label, divClassName = "", inputClassName = "", ...rest } = props;

  return (
    <div className={`mb-3 ${divClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        id={label}
        className={`form-control ${inputClassName}`}
        placeholder={`Enter ${label}`}
        {...rest}
      />
    </div>
  );
}
