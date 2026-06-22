import { ProjectLayout } from "@/components/features";
import { BackArrow, Loader, ErrorMessage } from "@/components/ui";
import { useBudgetDetailsQuery } from "@/hooks/queries";
import { getErrorMessage } from "@/lib/error-helpers";
import { Navigate, useParams } from "react-router-dom";

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: budget, isLoading, error } = useBudgetDetailsQuery(id);

  if (!id) return <Navigate to="/app/projects" replace />;

  if (isLoading) {
    return (
      <section>
        <Loader type="layout" />
      </section>
    );
  }

  return (
    <section>
      <BackArrow />
      {error && <ErrorMessage message={getErrorMessage(error)} />}
      {budget && <ProjectLayout budget={budget} />}
    </section>
  );
};
