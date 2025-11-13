import { ProjectForm } from "@/components/forms";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useAddSpecialBudgetMutation } from "@/hooks/queries/mutations";
import { SpecialBudgetForm } from "@shared/schemas";
import { useNavigate } from "react-router-dom";

export const CreateSpecialBudget = () => {
  const { mutate, isPending, error } = useAddSpecialBudgetMutation();
  const navigate = useNavigate();

  const handleCreate = (data: SpecialBudgetForm) => {
    mutate(data, {
      onSuccess: (newProject) => {
        navigate(`/app/projects/${newProject.id}`);
      },
    });
  };
  return (
    <div>
      {error && <ErrorMessage message={error.message} />}
      <ProjectForm onSubmit={handleCreate} isPending={isPending} edit={false} />
    </div>
  );
};
