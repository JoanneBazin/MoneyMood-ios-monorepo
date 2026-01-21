import { useEffect, useState } from "react";
import { BaseEntryForm } from "@shared/schemas";
import {
  BudgetDataCard,
  DateDisplay,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import { MonthlyExpenseEntry, WeeklyExpensesDisplayProps } from "@/types";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ExpensesList } from "@/components/ui/ExpensesList";
import { useWeeklyExpenses } from "@/hooks/useWeeklyExpenses";
import { useWeeklyExpensesAction } from "@/hooks/actions";

export const WeeklyExpensesDisplay = ({
  budgetId,
  weeklyBudget,
  expenses,
  edit = true,
  oldDate,
}: WeeklyExpensesDisplayProps) => {
  const [newExpenses, setNewExpenses] = useState<BaseEntryForm[]>([]);
  const [selectedEntry, setSelectedEntry] =
    useState<MonthlyExpenseEntry | null>(null);

  const {
    weekIndex,
    setWeekIndex,
    weeklyExpenses,
    remainingWeeklyBudget,
    currentWeekNumber,
  } = useWeeklyExpenses({ expenses, weeklyBudget });

  const { actions, state, status } = useWeeklyExpensesAction({ budgetId });

  useEffect(() => {
    setNewExpenses([]);
  }, [weekIndex]);

  useEffect(() => {
    if (selectedEntry) {
      actions.clearUpdateErrors();
    }
  }, [selectedEntry]);

  const handleAddExpenses = () => {
    const newWeeklyExpenses = newExpenses.map((exp) => ({
      ...exp,
      weekNumber: currentWeekNumber,
    }));
    actions.addExpenses(newWeeklyExpenses, () => setNewExpenses([]));
  };

  const handleUpdateExpense = (
    updatedExpense: BaseEntryForm,
    expenseId: string,
  ) => {
    if (
      updatedExpense.name === selectedEntry?.name &&
      Number(updatedExpense.amount) === selectedEntry.amount
    ) {
      setSelectedEntry(null);
      return;
    }

    actions.updateExpense(updatedExpense, expenseId, () =>
      setSelectedEntry(null),
    );
  };

  const handleExpenseValidation = (expense: MonthlyExpenseEntry) => {
    actions.updateExpenseValidation(expense);
  };

  const handleDeleteExpense = (expenseId: string) => {
    actions.deleteExpense(expenseId, () => setSelectedEntry(null));
  };

  return (
    <>
      {state.dashboardError && <ErrorMessage message={state.dashboardError} />}
      <BudgetDataCard title="Dépenses">
        {edit ? (
          <DateDisplay
            weekIndex={weekIndex}
            setIndex={setWeekIndex}
            isCurrentBudget={true}
          />
        ) : (
          <DateDisplay
            weekIndex={weekIndex}
            setIndex={setWeekIndex}
            isCurrentBudget={false}
            oldMonth={oldDate?.month}
            oldYear={oldDate?.year}
          />
        )}

        {edit ? (
          <div>
            <ExpensesList<MonthlyExpenseEntry>
              data={weeklyExpenses}
              validateExpense={handleExpenseValidation}
              setSelectedEntry={setSelectedEntry}
            />
            <AddEntriesForm
              initialData={newExpenses}
              errors={state.addValidationErrors}
              onResetErrors={() => actions.clearAddValidationErrors()}
              onChange={setNewExpenses}
              type="expense"
            />
            {newExpenses.length > 0 && (
              <button
                onClick={handleAddExpenses}
                className="primary-btn"
                data-testid="submit-form-entry"
                disabled={status.isAdding}
              >
                Enregistrer
              </button>
            )}
          </div>
        ) : (
          <ExpensesList
            data={weeklyExpenses}
            validateExpense={handleExpenseValidation}
            edit={false}
          />
        )}

        <TotalDataDisplay
          total={remainingWeeklyBudget}
          title="Budget hebdomadaire"
        />
        {selectedEntry && (
          <Modal
            isOpen={!!selectedEntry}
            onClose={() => setSelectedEntry(null)}
            title={`Mettre à jour les dépenses`}
          >
            <UpdateEntryForm
              initialData={selectedEntry}
              validationErrors={state.updateValidationError}
              genericError={state.modalError}
              onSubmit={handleUpdateExpense}
              onDelete={handleDeleteExpense}
              onResetErrors={() => actions.clearUpdateErrors()}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
