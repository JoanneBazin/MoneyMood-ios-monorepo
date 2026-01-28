import { useUpdateUserMutation } from "@/hooks/queries/mutations";
import { getChangedFields } from "@/lib/getChangedFields";
import { updateUserSchema, validateWithSchema } from "@shared/schemas";
import { User } from "@shared/types";
import { useState } from "react";

export const UpdateUserProfile = ({ user }: { user: User }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const updateUser = useUpdateUserMutation();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const isUpdates = Object.keys(getChangedFields(user, updatedUser)).length > 0;

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updated = getChangedFields(user, updatedUser);
    if (Object.keys(updated).length === 0) return;

    const { data, success, errors } = validateWithSchema(
      updateUserSchema,
      updated,
    );
    if (!success) {
      setValidationError(errors);
      return;
    }
    updateUser.mutate(data, {
      onError: () =>
        setRequestError(
          updateUser.error?.message ??
            "Une erreur est survenue lors de la mise à jour",
        ),
    });
  };

  return (
    <form className="update-user" onSubmit={handleUpdateUser}>
      {requestError && (
        <p className="form-error my-md" data-testid="create-req-error">
          {requestError}
        </p>
      )}
      <label className="update-user__item">
        Nom
        <input
          type="text"
          value={updatedUser.name}
          data-testid="user-name-input"
          onChange={(e) =>
            setUpdatedUser({
              ...updatedUser,
              name: e.target.value,
            })
          }
        />
      </label>
      {validationError && validationError.name ? (
        <p className="form-error" data-testid="name-input-error">
          {validationError.name}
        </p>
      ) : null}
      <label className="update-user__item">
        Email
        <input
          type="text"
          value={updatedUser.email}
          data-testid="user-email-input"
          onChange={(e) =>
            setUpdatedUser({
              ...updatedUser,
              email: e.target.value,
            })
          }
        />
      </label>
      {validationError && validationError.email ? (
        <p className="form-error" data-testid="email-input-error">
          {validationError.email}
        </p>
      ) : null}
      <div className="create-section__checkbox flex-start">
        <label className="create-section__checkbox__label">
          <input
            type="checkbox"
            checked={updatedUser.enabledExpenseValidation}
            data-testid="expense-validation-checkbox"
            onChange={() =>
              setUpdatedUser({
                ...updatedUser,
                enabledExpenseValidation: !updatedUser.enabledExpenseValidation,
              })
            }
          />
          Activer la validation des dépenses
        </label>
        <span className="create-section__checkbox__span">
          Ajustez le suivi de vos dépenses en temps réel en validant les
          montants débités
        </span>
      </div>
      <button
        className="primary-btn"
        disabled={!isUpdates}
        data-testid="update-user-submit"
      >
        Enregistrer
      </button>
    </form>
  );
};
