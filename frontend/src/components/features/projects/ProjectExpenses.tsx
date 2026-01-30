import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import { CategorySelect } from "@/components/forms/CategorySelect";
import {
  Modal,
  TotalDataDisplay,
  ErrorMessage,
  ExpensesList,
} from "@/components/ui";
import { useSpecialExpensesAction } from "@/hooks/actions";
import { useAppStore } from "@/stores/appStore";
import { ProjectExpensesProp, SpecialExpenseEntry } from "@/types";
import { BaseEntryForm } from "@shared/schemas";
import { useEffect, useMemo, useState } from "react";

export const ProjectExpenses = ({
  budgetId,
  expenses,
  categoryId,
}: ProjectExpensesProp) => {
  const [newExpenses, setNewExpenses] = useState<BaseEntryForm[]>([]);
  const [selectedEntry, setSelectedEntry] =
    useState<SpecialExpenseEntry | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { actions, state, status } = useSpecialExpensesAction({ budgetId });
  const user = useAppStore((s) => s.user);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]);

  useEffect(() => {
    if (selectedEntry) {
      setSelectedCategory(selectedEntry.specialCategoryId ?? "");
      actions.clearUpdateErrors();
    }
  }, [selectedEntry]);

  const handleAddExpenses = () => {
    const expenses = categoryId
      ? newExpenses.map((expense) => ({
          ...expense,
          specialCategoryId: categoryId,
        }))
      : newExpenses;

    actions.addExpenses(expenses, categoryId, () => setNewExpenses([]));
  };

  const handleUpdateExpense = (
    updatedExpense: BaseEntryForm,
    expenseId: string,
  ) => {
    const expense = { ...updatedExpense, specialCategoryId: selectedCategory };
    if (
      expense.name === selectedEntry?.name &&
      Number(expense.amount) === selectedEntry.amount &&
      expense.specialCategoryId === selectedEntry.specialCategoryId
    ) {
      setSelectedEntry(null);
      return;
    }

    actions.updateExpense(expense, expenseId, () => setSelectedEntry(null));
  };

  const handleExpenseValidation = (expense: SpecialExpenseEntry) => {
    actions.updateExpenseValidation(expense);
  };

  const handleDeleteExpense = (expenseId: string) => {
    actions.deleteExpense(expenseId, () => setSelectedEntry(null));
  };

  return (
    <div className="my-2xl">
      {state.dashboardError && <ErrorMessage message={state.dashboardError} />}

      <ExpensesList<SpecialExpenseEntry>
        data={expenses}
        enabledExpenseValidation={user?.enabledExpenseValidation ?? false}
        validateExpense={handleExpenseValidation}
        setSelectedEntry={setSelectedEntry}
      />

      <AddEntriesForm
        initialData={newExpenses}
        errors={state.addValidationErrors}
        onChange={setNewExpenses}
        onResetErrors={() => actions.clearAddValidationErrors()}
        type="special-expense"
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

      <TotalDataDisplay total={totalExpenses} />

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
          >
            <CategorySelect
              budgetId={budgetId}
              selectedCategory={selectedCategory}
              setCategory={setSelectedCategory}
            />
          </UpdateEntryForm>
        </Modal>
      )}
    </div>
  );
};
