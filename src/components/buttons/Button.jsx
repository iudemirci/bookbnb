import clsx from "clsx";

const types = {
  primary: "px-[14px] py-[12px] rounded-full",
  secondary: "px-[8px] py-[6px] rounded-lg",
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
        "!text-text-primary hover:!bg-text-secondary/10 cursor-pointer !text-[15px] !font-bold !duration-300 select-none",
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
