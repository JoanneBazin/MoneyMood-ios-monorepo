import { ServerOff } from "lucide-react";

export const OfflineBanner = () => {
  return (
    <div className="offline-banner">
      <ServerOff className="offline-banner__icon" />
      <p>Mode hors-ligne</p>
    </div>
  );
};
