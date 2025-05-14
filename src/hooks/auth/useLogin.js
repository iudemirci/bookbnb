import { useMutation } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoginOpen } from '../../store/modalSlice.js';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      const username = data.user.user_metadata.username;
      const role = data.user.user_metadata.role;

      if (role === 'admin') navigate('/dashboard');
      else navigate('/');

      message.success(`${t('login_success')}, ${username}`);
      dispatch(setIsLoginOpen());
    },
    onError: (error) => {
      message.error(error.message || t('login_error'));
    },
  });
};

export default useLogin;
