import { DeleteModalContentProps } from "@/types";

export const DeleteModalContent = ({
  onDelete,
  onClose,
}: DeleteModalContentProps) => {
  return (
    <div>
      <p className="req-info">
        Voulez-vous supprimer définitivement ce budget ?
      </p>
      <div className="flex-end my-md">
        <button onClick={onDelete} className="primary-btn">
          Supprimer
        </button>
        <button onClick={onClose} className="secondary-btn">
          Annuler
        </button>
      </div>
    </div>
  );
};
