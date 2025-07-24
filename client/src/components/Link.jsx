import { useRouter } from "../context/Router.context";

export default function Link({ href = "", children, ...rest } = {}) {
  const { navigate } = useRouter();
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
