import { useMutation } from "@tanstack/react-query";
import supabase from "../../services/supabase.js";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/authSlice.js";
import { useTranslation } from "react-i18next";

const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/");
      message.success(t("logout_success"));
      dispatch(clearUser());
    },
    onError: (error) => {
      message.error(error.message || t("logout_error"));
    },
  });
};

export default useLogout;
