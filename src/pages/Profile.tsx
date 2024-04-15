import { useNavigate } from "react-router-dom";
import { useCognito } from "../hooks/useCognito";
import { useEffect } from "react";
import { withCognito } from "../utils/withCognito";

function Profile() {
  const { user, isAuthenticated } = useCognito();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  });

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user?.name}</p>
    </div>
  );
}

const SecuredProfile = withCognito(Profile);


export { SecuredProfile as Profile};