import { SignupForm } from "@/components/forms";
import { BackArrow } from "@/components/ui";
import { PublicFooter } from "@/layouts/components";

export const SignupPage = () => {
  return (
    <div className="app-container">
      <main>
        <BackArrow destination="/" />
        <h1 className="my-xl">Inscription</h1>
        <SignupForm />
      </main>
      <PublicFooter />
    </div>
  );
};
