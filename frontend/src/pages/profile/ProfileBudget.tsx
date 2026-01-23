import { FixedChargesDisplay } from "@/components/features/fixed-entries/FixedChargesDisplay";
import { FixedIncomesDisplay } from "@/components/features/fixed-entries/FixedIncomesDisplay";

export const ProfileBudget = () => {
  return (
    <section className="my-2xl">
      <FixedIncomesDisplay />
      <FixedChargesDisplay />
    </section>
  );
};
