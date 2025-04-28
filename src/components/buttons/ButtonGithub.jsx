import { Icon } from "@iconify/react";

function ButtonGithub() {
  return (
    <a
      href="https://github.com/iudemirci"
      target="_blank"
      rel="noreferrer"
      className="group"
    >
      <div className="flex items-center justify-center rounded-full p-1.5 duration-300 hover:bg-gray-200 active:translate-y-0.5">
        <Icon icon="mdi:github" width={20} height={20} />
      </div>
    </a>
  );
}

export default ButtonGithub;
