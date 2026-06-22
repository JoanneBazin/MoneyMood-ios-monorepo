import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useState } from "react";

export const InstallPrompt = () => {
  const { canPrompt, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  const visible =
    !dismissed &&
    canPrompt &&
    localStorage.getItem("pwa-installed") !== "true" &&
    localStorage.getItem("pwa-disabled") !== "true";

  const handleDisable = () => {
    localStorage.setItem("pwa-disabled", "true");
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div className="prompt">
      <div className="prompt__content">
        <p className="prompt__text">
          Ajoutez MoneyMood à votre écran d'accueil !
        </p>
        <div className="prompt__actions">
          <button
            className="prompt__actions__later"
            onClick={() => setDismissed(true)}
          >
            Fermer
          </button>
          <button className="prompt__actions__disable" onClick={handleDisable}>
            Ne plus proposer
          </button>
          <button
            className="prompt__actions__add"
            onClick={() => {
              promptInstall();
              setDismissed(true);
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};
