import { useAuth } from "../hooks/useAuth";
import { withCognito } from "../utils/withCognito";

function Profile() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user?.name}</p>
    </div>
  );
}

const SecuredProfile = withCognito(Profile);


export { SecuredProfile as Profile};