import clsx from "clsx";

const types = {
  primary: "px-[8px] py-[6px]",
  secondary: "",
};

function Button({
  to = undefined,
  type = "primary",
  children,
  className,
  ...props
}) {
  return (
    <a
      href={to}
      target="_blank"
      className={clsx(
        "cursor-pointer rounded-lg font-semibold duration-300 hover:bg-gray-200 active:translate-y-0.5",
        types[type],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export default Button;
