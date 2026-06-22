import { useState } from "react";
import { BaseEntryForm } from "@shared/schemas";
import {
  BudgetDataCard,
  DateDisplay,
  Modal,
  TotalDataDisplay,
  ErrorMessage,
  ExpensesList,
} from "@/components/ui";
import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import { MonthlyExpenseEntry, WeeklyExpensesDisplayProps } from "@/types";
import { useWeeklyExpenses } from "@/hooks/useWeeklyExpenses";
import { useWeeklyExpensesAction } from "@/hooks/actions";
import { useSessionQuery } from "@/hooks/queries";

export const WeeklyExpensesDisplay = ({
  budgetId,
  weeklyBudget,
  expenses,
  edit = true,
  oldDate,
}: WeeklyExpensesDisplayProps) => {
  const [selectedEntry, setSelectedEntry] =
    useState<MonthlyExpenseEntry | null>(null);

  const {
    weekIndex,
    newExpenses,
    setNewExpenses,
    handleWeekChange,
    weeklyExpenses,
    remainingWeeklyBudget,
    currentWeekNumber,
  } = useWeeklyExpenses({ expenses, weeklyBudget, edit });

  const { actions, state, status } = useWeeklyExpensesAction({ budgetId });
  const { data: user } = useSessionQuery();

  const handleSelectEntry = (entry: MonthlyExpenseEntry) => {
    actions.clearModalErrors();
    setSelectedEntry(entry);
  };

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
    if (!user?.enabledExpenseValidation) return;
    actions.updateExpenseValidation(expense, edit);
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
            setIndex={handleWeekChange}
            isCurrentBudget={true}
          />
        ) : (
          <DateDisplay
            weekIndex={weekIndex}
            setIndex={handleWeekChange}
            isCurrentBudget={false}
            oldMonth={oldDate?.month}
            oldYear={oldDate?.year}
          />
        )}

        {edit ? (
          <div>
            <ExpensesList<MonthlyExpenseEntry>
              data={weeklyExpenses}
              enabledExpenseValidation={user?.enabledExpenseValidation ?? false}
              validateExpense={handleExpenseValidation}
              setSelectedEntry={handleSelectEntry}
            />
            <AddEntriesForm
              initialData={newExpenses}
              validationErrors={state.addValidationErrors}
              onResetErrors={() => actions.clearAddValidationErrors()}
              onChange={setNewExpenses}
              type="expenses"
            />
            {newExpenses.length > 0 && (
              <button
                onClick={handleAddExpenses}
                className="primary-btn"
                data-testid="add-expenses-btn"
                disabled={status.isAdding}
              >
                Enregistrer
              </button>
            )}
          </div>
        ) : (
          <ExpensesList
            data={weeklyExpenses}
            enabledExpenseValidation={user?.enabledExpenseValidation ?? false}
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
              reqError={state.modalError}
              onSubmit={handleUpdateExpense}
              onDelete={handleDeleteExpense}
              onResetErrors={() => actions.clearUpdateValidationErrors()}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
