import { FixedEntriesDisplay } from "@/components/features";
import { useFixedChargesQuery, useFixedIncomesQuery } from "@/hooks/queries";

export const ProfileBudget = () => {
  const { data: fixedCharges = [] } = useFixedChargesQuery();
  const { data: fixedIncomes = [] } = useFixedIncomesQuery();

  return (
    <section className="my-2xl">
      <FixedEntriesDisplay entries={fixedIncomes} type="incomes" />
      <FixedEntriesDisplay entries={fixedCharges} type="charges" />
    </section>
  );
};
