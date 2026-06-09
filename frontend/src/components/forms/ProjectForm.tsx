import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ProjectFormProps } from "@/types";
import { SpecialBudgetForm } from "@shared/schemas";

export const ProjectForm = ({
  onSubmit,
  isPending,
  validationErrors,
  reqError,
  onResetErrors,
  edit,
  initialData,
}: ProjectFormProps) => {
  const [specialBudget, setSpecialBudget] = useState({
    name: initialData ? initialData.name : "",
    totalBudget: initialData ? initialData.totalBudget : "",
  });

  const handleChange = (field: keyof SpecialBudgetForm, value: string) => {
    onResetErrors();
    setSpecialBudget({ ...specialBudget, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(specialBudget);
  };

  return (
    <form className="gap-lg" data-testid="project-form">
      <div className="labelled-input">
        <label htmlFor="name">Nom du budget</label>
        <input
          type="text"
          id="name"
          name="name"
          value={specialBudget.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {validationErrors && validationErrors.name && (
          <p className="form-error" data-testid="name-validation-error">
            {validationErrors.name}
          </p>
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
            onChange={(e) => handleChange("totalBudget", e.target.value)}
          />
        </div>

        {validationErrors && validationErrors.totalBudget && (
          <p className="form-error" data-testid="amount-validation-error">
            Montant invalide
          </p>
        )}
      </div>

      {reqError && (
        <p className="req-error" data-testid="error-message">
          {reqError}
        </p>
      )}

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
