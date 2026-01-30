import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { InfoMessage } from "./InfoMessage";
import { ErrorMessage } from "./ErrorMessage";

export const OfflineEmptyState = ({ error }: { error?: string }) => {
  const { isOffline } = useOfflineStatus();

  if (isOffline) {
    return (
      <InfoMessage
        message="Contenu non disponible hors ligne."
        comment="Connectez-vous à Internet et visitez cette page pour la rendre 
        disponible hors ligne."
      />
    );
  }
  return <ErrorMessage message={error} />;
};
