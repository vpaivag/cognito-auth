import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
})

const resolver = zodResolver(schema);

type SignupData = {
  email: string;
  phoneNumber?: string;
  name: string;
  password: string;
};

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver
  });

  const handleSigin: SubmitHandler<SignupData> = async ({
    email,
    name,
    password
  }) => {
    setError(null);
    try {
      const { nextStep } = await signUp({
        username: email as string,
        password,
        options: {
          userAttributes: {
            email,
            name
          }
        }
      })

    switch (nextStep.signUpStep) {
      case "CONFIRM_SIGN_UP":
        navigate("/confirm-signup", {
          state: {
            email
          }
        });
        break;
      default:
        // Navigate to the login page after successful signup
        // Auto sign in is disabled by default
        navigate("/login");
        break;
    }

    } catch (error) {
      console.error("Error signing in: ", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Signup</h1>  
      <p>This is the signup page</p>
      <form className="form" onSubmit={handleSubmit(handleSigin)}>
        {error && <p className="error">{error}</p>}
        <div className="input">
          <label>Email</label>
          <input {...register("email")} />
          {errors.email && <p className="error">{errors.email.message as string}</p>}
        </div>
        <div className="input">
          <label>Name</label>
          <input {...register("name")} />
          {errors.name && <p className="error">{errors.name.message as string}</p>}
        </div>
        <div className="input">
          <label>Password</label>
          <input {...register("password")} type="password" />
          {errors.password && <p className="error">{errors.password.message as string}</p>}
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export { Signup }