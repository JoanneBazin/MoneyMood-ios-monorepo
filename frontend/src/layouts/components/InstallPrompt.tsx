import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useEffect, useState } from "react";

export const InstallPrompt = () => {
  const { canPrompt, promptInstall } = useInstallPrompt();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyInstalled = localStorage.getItem("pwa-installed") === "true";
    const disabledByUser = localStorage.getItem("pwa-disabled") === "true";
    if (canPrompt && !alreadyInstalled && !disabledByUser) {
      setVisible(true);
    }
  }, [canPrompt]);

  const handleDisable = () => {
    localStorage.setItem("pwa-disabled", "true");
    setVisible(false);
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
            onClick={() => setVisible(false)}
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
              setVisible(false);
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};
