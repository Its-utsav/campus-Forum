/**
 *
 * @param {{label:string,className:string}} param0
 * @returns
 */
export default function Button({ label, className = "" }) {
  return (
    <button type="button" className={`btn ${className}`}>
      {label}
    </button>
  );
}
