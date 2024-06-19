import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function withCognito<P extends JSX.IntrinsicAttributes>(Component: React.ComponentType<P>) {
  return function AuthComponent(props: P) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
}

export { withCognito };