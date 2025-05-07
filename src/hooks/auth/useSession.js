import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../../services/supabase.js';
import { clearUser, setPending, setUser } from '../../store/authSlice.js';

export default function useSessions() {
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.auth.session);
  const sessionRef = useRef(currentSession);

  const sessionsAreDifferent = (a, b) => {
    if (!a && !b) return false;
    if (!a || !b) return true;
    return a.user?.id !== b.user?.id || a.access_token !== b.access_token;
  };

  useEffect(() => {
    let mounted = true;

    dispatch(setPending(true));

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (sessionsAreDifferent(session, sessionRef.current)) {
          if (session) {
            dispatch(setUser({ user: session.user, session }));
          } else {
            dispatch(clearUser());
          }
          sessionRef.current = session;
        } else {
          dispatch(setPending(false));
        }
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        dispatch(setPending(false));
      });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (sessionsAreDifferent(session, sessionRef.current)) {
        if (session) {
          dispatch(
            setUser({
              user: session.user,
              session: {
                access_token: session.access_token,
                token_type: session.token_type,
                expires_in: session.expires_in,
                expires_at: session.expires_at,
                refresh_token: session.refresh_token,
              },
            }),
          );
        } else {
          dispatch(clearUser());
        }
        sessionRef.current = session;
      }
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, [dispatch]);
}
