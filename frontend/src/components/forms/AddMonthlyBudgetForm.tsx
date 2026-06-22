import { getWeeksInMonth } from "@/lib/weeks-helpers";
import { AddMonthlyBudgetFormProps } from "@/types";
import { BaseEntryForm } from "@shared/schemas";
import { useState } from "react";
import { BudgetDataCard, MonthYearPicker } from "../ui";
import { AddEntriesForm } from "./AddEntriesForm";
import { useMonthlyBudgetAction } from "@/hooks/actions";

export const AddMonthlyBudgetForm = ({
  incomes,
  charges,
}: AddMonthlyBudgetFormProps) => {
  const [month, setMonth] = useState<number | null>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number | null>(new Date().getFullYear());

  const [monthlyCharges, setMonthlyCharges] = useState<BaseEntryForm[]>(
    charges.map((c) => ({ ...c, amount: c.amount.toString() })),
  );
  const [monthlyIncomes, setMonthlyIncomes] = useState<BaseEntryForm[]>(
    incomes.map((i) => ({ ...i, amount: i.amount.toString() })),
  );
  const [isCurrent, setIsCurrent] = useState(true);

  const { actions, state, status } = useMonthlyBudgetAction();

  const handleDateChange = (month: number, year: number) => {
    setMonth(month);
    setYear(year);
  };

  const handleSubmit = () => {
    if (!year || !month) return;

    const newBudget = {
      month,
      year,
      isCurrent,
      incomes: monthlyIncomes,
      charges: monthlyCharges,
      numberOfWeeks: getWeeksInMonth(year, month).length,
    };

    actions.addMonthlyBudget(newBudget);
  };

  return (
    <div className="flex-col">
      <div className="create-section__title">
        <h2>Budget pour le mois de</h2>
        <MonthYearPicker onChange={handleDateChange} />
      </div>
      {state.dashboardError && (
        <p className="form-error my-md" data-testid="create-req-error">
          {state.dashboardError}
        </p>
      )}
      <BudgetDataCard title="Revenus">
        <AddEntriesForm
          entries={monthlyIncomes}
          validationErrors={state.addIncomesValidationErrors}
          onChange={setMonthlyIncomes}
          onResetErrors={() => actions.clearAddIncomesValidationErrors()}
          type="incomes"
        />
      </BudgetDataCard>
      <BudgetDataCard title="Charges">
        <AddEntriesForm
          entries={monthlyCharges}
          validationErrors={state.addChargesValidationErrors}
          onChange={setMonthlyCharges}
          onResetErrors={() => actions.clearAddChargesValidationErrors()}
          type="charges"
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
        className="primary-btn item-end"
        data-testid="submit-monthly-budget"
        disabled={status.isAdding}
      >
        Valider
      </button>
    </div>
  );
};
