import { useNavigate } from "react-router-dom";
import { useCognito } from "../hooks/useCognito";
import { useEffect } from "react";

function Protected() {
  const { user, isAuthenticated } = useCognito();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  });

  return (
    <div>
      <h1>Protected</h1>
      <p>Welcome, {user?.name}</p>
    </div>
  );
}

export { Protected };