export default function useIsAdmin() {
  return localStorage.getItem('user_role') === 'admin' || localStorage.getItem('user_role') === 'superadmin';
}
