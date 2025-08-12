import { AlertOctagon } from "lucide-react";

export const ErrorMessage = ({
  message = "Erreur lors de la récupération des données",
}) => {
  return (
    <div className="flex-center gap-sm red-error my-2xl">
      <AlertOctagon />
      <div>
        <p className="req-error">{message}</p>
        <p className="form-error">Veuillez réessayer ultérieurement</p>
      </div>
    </div>
  );
};
