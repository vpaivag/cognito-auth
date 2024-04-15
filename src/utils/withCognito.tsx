import { Navigate } from "react-router-dom";
import { useCognito } from "../hooks/useCognito";

function withCognito<P extends JSX.IntrinsicAttributes>(Component: React.ComponentType<P>) {
  return function AuthComponent(props: P) {

    const { isAuthenticated } = useCognito();
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
      // return <p></p>;
    }
    return <Component {...props} />;
  };
}

export { withCognito };