import { useState } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="border-border-grey shadow-search relative h-[56px] w-full rounded-full border-[0.5px] duration-300">
      <input
        type="text"
        className="focus:outline-primary flex size-full items-center justify-center rounded-full px-4 text-sm outline-1 outline-transparent duration-300"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <div
        className={clsx(
          "pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-2 duration-300",
          isFocused && "opacity-0",
        )}
      >
        <Icon icon="material-symbols:search" width="18" height="18" />
        <span className="text-md text-center font-semibold text-black">
          {t("search_placeholder")}
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
