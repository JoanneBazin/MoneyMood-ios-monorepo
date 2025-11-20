import { ProjectForm } from "@/components/forms";
import { useAddSpecialBudgetMutation } from "@/hooks/queries/mutations";
import { SpecialBudgetForm } from "@shared/schemas";
import { useNavigate } from "react-router-dom";

export const CreateSpecialBudget = () => {
  const { mutate, isPending, isError } = useAddSpecialBudgetMutation();
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
      <ProjectForm
        onSubmit={handleCreate}
        isPending={isPending}
        isError={isError}
        edit={false}
      />
    </div>
  );
};
