import clsx from "clsx";

function MainWrapper({ as: Element = "div", className, children, ...props }) {
  return (
    <Element className={clsx("px-6", className)} {...props}>
      {children}
    </Element>
  );
}

export default MainWrapper;
