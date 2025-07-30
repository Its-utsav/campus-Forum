/**
 *
 * @param {{label:string,className:string} & import("react").ButtonHTMLAttributes<HtmlHTMLAttributes>} props
 * @returns
 */
export default function Button(props) {
  const { label, className = "", ...rest } = props;
  return (
    <button type="button" className={`btn ${className}`} {...rest}>
      {label}
    </button>
  );
}
