import { DeleteModalContentProps } from "@/types";
import { ErrorMessage } from "./ErrorMessage";
import { Loader2 } from "lucide-react";

export const DeleteModalContent = ({
  onDelete,
  onClose,
  isPending,
  isError,
}: DeleteModalContentProps) => {
  return (
    <div data-testid="delete-modal">
      <p className="req-info">
        Voulez-vous supprimer définitivement ce budget ?
      </p>
      {isError && <ErrorMessage message="Une erreur est survenue" />}
      <div className="flex-end my-md">
        <button
          onClick={onDelete}
          className="primary-btn"
          data-testid="confirm-delete-btn"
        >
          {isPending ? <Loader2 /> : "Supprimer"}
        </button>
        <button onClick={onClose} className="secondary-btn">
          Annuler
        </button>
      </div>
    </div>
  );
};
