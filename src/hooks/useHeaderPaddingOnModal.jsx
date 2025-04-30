import { useEffect } from "react";
import { debounce } from "lodash";

const useHeaderPaddingOnModal = (isModalOpen) => {
  const header = document.querySelector("header");

  const resetHeader = debounce(() => {
    header.style.paddingRight = "";
  }, 155);

  useEffect(() => {
    if (isModalOpen) {
      if (header) {
        header.style.paddingRight = "15px";
      }
    } else {
      resetHeader();
    }

    return () => {
      resetHeader.cancel();
    };
  }, [isModalOpen, resetHeader]);
};

export default useHeaderPaddingOnModal;
