import clsx from "clsx";

function Container({ as: Element = "div", className, children, ...props }) {
  return (
    <Element
      className={clsx("max-w-[2560px] px-6 md:px-12 2xl:px-24", className)}
      {...props}
    >
      {children}
    </Element>
  );
}

export default Container;
