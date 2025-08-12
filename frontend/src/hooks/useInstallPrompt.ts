import { useEffect, useState } from "react";

export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [canPrompt, setCanPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as any);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as any).prompt();

    const result = await (deferredPrompt as any).userChoice;
    if (result.outcome === "accepted") {
      console.log("App added to home screen");
      setCanPrompt(false);
      localStorage.setItem("pwa-installed", "true");
    } else {
      console.log("User dismissed install prompt");
    }

    setDeferredPrompt(null);
  };

  return { canPrompt, promptInstall };
};
