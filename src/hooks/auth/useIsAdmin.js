import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase';

const fetchUserRole = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error('No session found');
  }

  const { data, error } = await supabase.from('users').select('role').eq('user_id', session.user.id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data.role;
};

export default function useIsAdmin() {
  const { data: role, isPending } = useQuery({
    queryKey: ['user', 'role'],
    queryFn: fetchUserRole,
    staleTime: 1000 * 60 * 5,
  });

  return {
    isAdmin: role === 'admin' || role === 'superadmin',
    isPending,
  };
}
