import { useCognito } from "../hooks/useCognito";
import { withCognito } from "../utils/withCognito";

function Profile() {
  const { user } = useCognito();
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user?.name}</p>
    </div>
  );
}

const SecuredProfile = withCognito(Profile);


export { SecuredProfile as Profile};