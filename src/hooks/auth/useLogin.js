import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabase.js';
import { setIsLoginOpen } from '../../store/modalSlice.js';

const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (authError) throw authError;

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('username, role')
    .eq('user_id', authData.user.id)
    .single();

  return { user: authData.user, profile: userData };
};

export const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: loginUser,
    onSuccess: ({ user, profile }) => {
      const { username, role } = profile;
      localStorage.setItem('user_role', role);

      if (role === 'admin' || role === 'superadmin') navigate('/dashboard');
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
