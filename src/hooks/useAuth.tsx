import { useAtom } from 'jotai';  
import { isAuthenticatedAtom, userAtom } from '../atoms/session';
import { signOut } from 'aws-amplify/auth';

export const useAuth = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);

  return { isAuthenticated, user, signOut };
};