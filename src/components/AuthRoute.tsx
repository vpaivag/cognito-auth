import { Navigate } from "react-router-dom";
import { useCognito } from "../hooks/useCognito";

function WithCognito({children}) {
  const { isAuthenticated } = useCognito();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;

}

export { WithCognito };