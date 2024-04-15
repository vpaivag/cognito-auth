import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const resolver = zodResolver(schema);

type LoginData = z.infer<typeof schema>;

function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit, // Funcion que valida inputs antes de realizar logica
    formState: { errors },
  } = useForm<LoginData>({
    resolver
  });

  const handleSigin: SubmitHandler<LoginData> = async ({
    email,
    password
  }) => {
    setError(null);
    try {
      await signIn({
        username: email,
        password: password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        }
      });
      // Navigate to the home page after successful login
      navigate("/", {
        replace: true
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }

  };

  return (
    <div>
      <h1>Login</h1>  
      <p>This is the login page</p>
      <form className="form" onSubmit={handleSubmit(handleSigin)}>
        {error && <p className="error">{error}</p>}
        <div className="input">
          <label>Email</label>
          <input {...register("email")} />
          {errors.email && <p className="error">{errors.email.message as string}</p>}
        </div>
        <div className="input">
          <label>Password</label>
          <input {...register("password")} type="password" />
          {errors.password && <p className="error">{errors.password.message as string}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export { Login }