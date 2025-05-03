import { useMutation } from '@tanstack/react-query';
import supabase from '../../services/supabase.js';
import { message } from 'antd';
import { setIsSignupOpen } from '../../store/modalSlice.js';
import { useDispatch } from 'react-redux';

const signupUser = async (credentials) => {
  const { email, password, username, role } = credentials;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        role,
      },
    },
  });
  if (error) throw error;

  const { error: usersError } = await supabase
    .from('users')
    .insert([{ username: username }])
    .select();

  if (usersError) throw usersError;
  return data;
};

export const useSignup = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: signupUser,
    onSuccess: () => {
      message.success('Account created successfully!');
      dispatch(setIsSignupOpen());
    },
    onError: (error) => {
      message.error(error.message || 'Failed to create account');
    },
  });
};

export default useSignup;
