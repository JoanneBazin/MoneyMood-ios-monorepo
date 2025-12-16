import { PublicFooter } from "@/layouts/components";
import { Coins, Lock, TabletSmartphone } from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="app-container landing">
      <main className="landing__main">
        <h1 className="landing__logo">MoneyMood</h1>

        <section className="landing__hero">
          <h2 className="landing__title">Gardez un œil sur vos finances</h2>
          <div className="landing__links">
            <Link to="/login" className="primary-btn" data-testid="login-btn">
              Connexion
            </Link>
            <Link
              to="/signup"
              className="secondary-btn"
              data-testid="signup-btn"
            >
              Créer un compte
            </Link>
          </div>
        </section>

        <section className="landing__features">
          <div className="feature">
            <Coins />
            <p>Suivi simple par semaine</p>
          </div>
          <div className="feature">
            <Lock />
            <p>Données privées</p>
          </div>
          <div className="feature">
            <TabletSmartphone />
            <p>Accessible sur tous vos appareils</p>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};
