import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  // E.164 phone number regex
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Invalid phone number",
  }),
  password: z.string().min(8),
});

const resolver = zodResolver(schema);

type LoginData = z.infer<typeof schema>;

function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver
  });

  const handleSigin: SubmitHandler<LoginData> = async ({
    phoneNumber,
    password
  }) => {
    console.log("phoneNumber: " + phoneNumber);
    setError(null);
    try {
      await signIn({
        username: phoneNumber,
        password: password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        }
      });
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
          <label>Phone Number</label>
          <input type="tel" {...register("phoneNumber")} />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber.message as string}</p>}
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