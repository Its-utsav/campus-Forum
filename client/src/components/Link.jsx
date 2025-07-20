export default function Link({ href = "", children, ...rest } = {}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        history.replaceState({}, "", href);
        e.preventDefault();
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
