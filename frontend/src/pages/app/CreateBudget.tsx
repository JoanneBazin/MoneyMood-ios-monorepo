import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import { monthlyBudgetSchema, validateWithSchema } from "@shared/schemas";
import { extractArrayErrors } from "@/lib/extractArrayErrors";
import { getWeeksInMonth } from "@/lib/weeks-helpers";
import { useCreateBudgetMutation } from "@/hooks/queries/mutations";
import { BudgetDataCard, MonthYearPicker } from "@/components/ui";
import { AddEntriesForm } from "@/components/forms";
import { BaseEntryForm } from "@/types";

export const CreateBudget = () => {
  const {
    fixedCharges: charges,
    fixedIncomes: incomes,
    setPageTitle,
  } = useBudgetStore();
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const [monthlyCharges, setMonthlyCharges] =
    useState<BaseEntryForm[]>(charges);
  const [monthlyIncomes, setMonthlyIncomes] =
    useState<BaseEntryForm[]>(incomes);
  const [isCurrent, setIsCurrent] = useState(true);

  const [incomesErrors, setIncomesErrors] = useState<
    Record<string, string>[] | null
  >(null);
  const [chargesErrors, setChargesErrors] = useState<
    Record<string, string>[] | null
  >(null);
  const { mutate, isPending, error: requestError } = useCreateBudgetMutation();

  useEffect(() => {
    setPageTitle("Ajouter un budget mensuel");
  }, []);

  const handleDateChange = (month: number, year: number) => {
    setMonth(month);
    setYear(year);
  };

  const handleSubmit = () => {
    setIncomesErrors(null);
    setChargesErrors(null);

    if (!year || !month) return;

    const newBudget = {
      month,
      year,
      isCurrent,
      incomes: monthlyIncomes,
      charges: monthlyCharges,
      numberOfWeeks: getWeeksInMonth(year, month).length,
    };

    const validation = validateWithSchema(monthlyBudgetSchema, newBudget);
    if (!validation.success) {
      setIncomesErrors(extractArrayErrors(validation.errors, "incomes"));
      setChargesErrors(extractArrayErrors(validation.errors, "charges"));
      return;
    }

    mutate(validation.data);
  };

  return (
    <section className="create-section">
      <div className="create-section__title">
        <h2>Budget pour le mois de</h2>
        <MonthYearPicker onChange={handleDateChange} />
      </div>
      {requestError && (
        <p className="form-error my-md">{requestError.message}</p>
      )}
      <BudgetDataCard title="Revenus">
        <AddEntriesForm
          initialData={monthlyIncomes}
          errors={incomesErrors}
          onChange={setMonthlyIncomes}
          onResetErrors={() => setIncomesErrors(null)}
          type="income"
        />
      </BudgetDataCard>
      <BudgetDataCard title="Charges">
        <AddEntriesForm
          initialData={monthlyCharges}
          errors={chargesErrors}
          onChange={setMonthlyCharges}
          onResetErrors={() => setChargesErrors(null)}
          type="charge"
        />
      </BudgetDataCard>

      <div className="create-section__checkbox">
        <label className="create-section__checkbox__label">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
          />
          Définir comme budget actif
        </label>
        <span className="create-section__checkbox__span">
          Ce budget sera disponible directement sur votre dashboard
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="primary-btn"
        data-testid="submit-monthly-budget"
        disabled={isPending}
      >
        Valider
      </button>
    </section>
  );
};
