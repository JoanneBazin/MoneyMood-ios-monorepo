import { HistoryBudgetLayout } from "@/components/features";
import { BackArrow, ErrorMessage, Loader } from "@/components/ui";
import { useHistoryDetailsQuery } from "@/hooks/queries";
import { getErrorMessage } from "@/lib/error-helpers";
import { Navigate, useParams } from "react-router-dom";

export const HistoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: budget, isLoading, error } = useHistoryDetailsQuery(id);

  if (!id) return <Navigate to="/app/history" replace />;

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
      {budget && <HistoryBudgetLayout budget={budget} />}
    </section>
  );
};
