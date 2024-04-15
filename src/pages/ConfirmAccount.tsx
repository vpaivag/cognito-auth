import { confirmSignUp } from "aws-amplify/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function ConfirmAccount() {
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const {state} = useLocation();
  console.log('state', state);
  const username = state?.phoneNumber;

  if (!username) {
    navigate("/signup");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit');

    try {
      const { isSignUpComplete } = await confirmSignUp({
        username,
        confirmationCode: code
      });
      if (isSignUpComplete) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error confirming signup: ", error);
    }
  }

  return (
    <div>
      <h1>Confirm Account</h1>  
      <p>This is the confirmation page</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <label>Code</label>
          <input onChange={
            (e) => setCode(e.target.value)
          }
          value={code}
          />
        </div>
        
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export { ConfirmAccount };