import { DeleteModalContentProps } from "@/types";
import { Loader2 } from "lucide-react";

export const DeleteModalContent = ({
  onDelete,
  onClose,
  isPending,
  reqError,
}: DeleteModalContentProps) => {
  return (
    <div data-testid="delete-modal">
      <p className="req-info">
        Voulez-vous supprimer définitivement ce budget ?
      </p>
      {reqError && (
        <p className="req-error" data-testid="error-message">
          {reqError}
        </p>
      )}
      <div className="flex-end my-md">
        <button
          onClick={onDelete}
          className="primary-btn"
          data-testid="confirm-delete-btn"
        >
          {isPending ? <Loader2 /> : "Supprimer"}
        </button>
        <button
          onClick={onClose}
          className="secondary-btn"
          data-testid="cancel-delete-btn"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};
