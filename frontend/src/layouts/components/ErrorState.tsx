import { useNavigate } from "react-router-dom";

export const ErrorState = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="app-container page-404">
      <div className="page-404__container">
        <h1 className="page-404__title">Une erreur est survenue</h1>
        <p>Veuillez réessayer ultérieurement</p>
        <div className="page-404__buttons">
          <button onClick={goHome} className="primary-btn">
            Retour à l'accueil
          </button>
          <button onClick={goBack} className="secondary-btn">
            Réessayer
          </button>
        </div>
        <div className="page-404__illustration">
          <div className="coin coin-1">€</div>
          <div className="coin coin-2">€</div>
          <div className="coin coin-3">€</div>
        </div>
      </div>
    </section>
  );
};
