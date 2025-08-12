import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="app-container page-404">
      <div className="page-404__container">
        <div className="page-404__number">
          4<span className="bounce">0</span>4
        </div>
        <h1 className="page-404__title">Oups ! Page introuvable</h1>
        <div className="page-404__buttons">
          <button onClick={goHome} className="primary-btn">
            Retour à l'accueil
          </button>
          <button onClick={goBack} className="secondary-btn">
            Retour
          </button>
        </div>
        <div className="page-404__illustration">
          <div className="coin coin-1">€</div>
          <div className="coin coin-2">€</div>
          <div className="coin coin-3">€</div>
        </div>
      </div>
    </main>
  );
};
