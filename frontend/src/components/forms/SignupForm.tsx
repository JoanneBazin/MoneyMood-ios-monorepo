import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchema, validateWithSchema } from "@shared/schemas/index";
import { useSignupMutation } from "@/hooks/queries/mutations";

export const SignupForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const { mutate, isPending, error } = useSignupMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages({});

    const validation = validateWithSchema(signupSchema, user);
    if (!validation.success) {
      setErrorMessages(validation.errors);
      return;
    }

    mutate(validation.data, { onSuccess: () => navigate("/app") });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div>
        <input
          type="name"
          name="name"
          value={user.name}
          onChange={(e) => handleChange(e)}
          placeholder="nom"
          aria-label="Nom"
        />
        {errorMessages.name && (
          <p className="form-error">{errorMessages.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="email"
          aria-label="Email"
        />
        {errorMessages.email && (
          <p className="form-error">{errorMessages.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="mot de passe"
          aria-label="Mot de passe"
        />
        {errorMessages.password && (
          <p className="form-error">{errorMessages.password}</p>
        )}
      </div>

      <button type="submit" disabled={isPending} className="primary-btn">
        S'inscrire
      </button>
      {error && <p className="req-error">{error.message}</p>}
    </form>
  );
};
