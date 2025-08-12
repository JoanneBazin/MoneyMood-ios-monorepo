import { LoginForm } from "@/components/forms";
import { BackArrow } from "@/components/ui";
import { PublicFooter } from "@/layouts/components";

export const LoginPage = () => {
  return (
    <div className="app-container">
      <main>
        <BackArrow destination="/" />
        <h1 className="my-xl">Connexion</h1>
        <LoginForm />
      </main>
      <PublicFooter />
    </div>
  );
};
