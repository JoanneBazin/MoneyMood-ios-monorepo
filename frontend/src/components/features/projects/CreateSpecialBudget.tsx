import { ProjectForm } from "@/components/forms";
import { useSpecialBudgetAction } from "@/hooks/actions";
import { SpecialBudgetForm } from "@shared/schemas";

export const CreateSpecialBudget = () => {
  const { actions, state, status } = useSpecialBudgetAction();

  const handleCreate = (data: SpecialBudgetForm) => {
    actions.addSpecialBudget(data);
  };
  return (
    <div>
      <ProjectForm
        onSubmit={handleCreate}
        isPending={status.isAdding}
        validationErrors={state.addValidationErrors}
        reqError={state.modalError}
        onResetErrors={() => actions.clearAddValidationErrors()}
        edit={false}
      />
    </div>
  );
};
