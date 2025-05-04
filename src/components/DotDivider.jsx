import clsx from 'clsx';

function DotDivider({ className, ...props }) {
  return (
    <span className={clsx('px-1 text-black', className)} {...props}>
      &middot;
    </span>
  );
}

export default DotDivider;
