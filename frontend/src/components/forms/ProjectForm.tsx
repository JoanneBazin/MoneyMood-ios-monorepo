import { specialBudgetSchema, validateWithSchema } from "@shared/schemas";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ProjectFormProps } from "@/types";
import { ErrorMessage } from "../ui/ErrorMessage";

export const ProjectForm = ({
  onSubmit,
  isPending,
  isError,
  edit,
  initialData,
}: ProjectFormProps) => {
  const [specialBudget, setSpecialBudget] = useState({
    name: initialData ? initialData.name : "",
    totalBudget: initialData ? initialData.totalBudget : "",
  });
  const [validationError, setValidationError] = useState<Record<
    string,
    string
  > | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const validation = validateWithSchema(specialBudgetSchema, specialBudget);
    if (!validation.success) {
      setValidationError(validation.errors);
      return;
    }
    onSubmit(validation.data);
  };

  return (
    <form className="gap-lg" data-testid="project-form">
      {isError && <ErrorMessage message="Une erreur est survenue" />}
      <div className="labelled-input">
        <label htmlFor="name">Nom du budget</label>
        <input
          type="text"
          id="name"
          name="name"
          value={specialBudget.name}
          onChange={(e) =>
            setSpecialBudget({ ...specialBudget, name: e.target.value })
          }
        />
        {validationError && validationError.name && (
          <p className="form-error">{validationError.name}</p>
        )}
      </div>
      <div className="labelled-input">
        <label htmlFor="amount">Montant prévu</label>
        <div className="flex-center">
          <span className="mr-xxs">€</span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={specialBudget.totalBudget}
            onChange={(e) =>
              setSpecialBudget({
                ...specialBudget,
                totalBudget: e.target.value,
              })
            }
          />
        </div>

        {validationError && validationError.totalBudget && (
          <p className="form-error">Montant invalide</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="primary-btn"
        data-testid={edit ? "edit-project" : "create-project"}
      >
        {isPending ? <Loader2 /> : edit ? "Mettre à jour" : "Créer"}
      </button>
    </form>
  );
};
