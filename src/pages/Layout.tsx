import { Link, Outlet } from "react-router-dom";
import { useCognito } from "../hooks/useCognito";

function Layout() {

  const { isAuthenticated, signOut, user } = useCognito(); // Import the useCognito hook

  return (
    <>
    <header className="navbar">
      <h1>Cognito App</h1>
      <p>{user?.name}</p>
      <div>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/profile">Profile</Link>
        {isAuthenticated ? (
          <button onClick={signOut} className="signout-btn">Sign Out</button>
        ) : (
          <>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
    <div>
      <Outlet />
    </div>
    </>
  );
}

export { Layout };