import { useEffect, useState } from "react";
import {
  BaseEntryForm,
  baseEntrySchema,
  expenseSchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddExpensesMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from "@/hooks/queries/mutations";
import {
  BudgetDataCard,
  DataList,
  DateDisplay,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import { ExpenseEntry, WeeklyExpensesDisplayProps } from "@/types";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { getCurrentWeek } from "@/lib/weeks-helpers";

export const WeeklyExpensesDisplay = ({
  budgetId,
  weeklyBudget,
  expenses,
  edit = true,
  oldDate,
}: WeeklyExpensesDisplayProps) => {
  const [newExpenses, setNewExpenses] = useState<BaseEntryForm[]>([]);
  const [weekIndex, setWeekIndex] = useState(getCurrentWeek());
  const currentWeekNumber = weekIndex + 1;
  const weeklyExpenses = expenses.filter(
    (expense) => expense.weekNumber === currentWeekNumber
  );
  const remainingWeeklyBudget =
    weeklyBudget - weeklyExpenses.reduce((acc, entry) => acc + entry.amount, 0);

  const [selectedEntry, setSelectedEntry] = useState<ExpenseEntry | null>(null);

  const addExpenses = useAddExpensesMutation();
  const updateExpense = useUpdateExpenseMutation();
  const deleteExpense = useDeleteExpenseMutation();

  const [validationError, setValidationError] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const addRequestError = addExpenses.isError;
  const [requestError, setRequestError] = useState<string | null>(null);

  useEffect(() => {
    setNewExpenses([]);
  }, [weekIndex]);

  const handleAddExpenses = () => {
    setValidationError(null);
    setRequestError(null);

    const newWeeklyExpenses = newExpenses.map((exp) => ({
      ...exp,
      weekNumber: currentWeekNumber,
    }));

    const validation = validateArrayWithSchema(
      expenseSchema,
      newWeeklyExpenses
    );
    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addExpenses.mutate(
      { expenses: validation.data, budgetId },
      { onSuccess: () => setNewExpenses([]) }
    );
  };

  const handleUpdateExpense = (
    updatedExpense: BaseEntryForm,
    expenseId: string
  ) => {
    setUpdateValidationError(null);
    setRequestError(null);

    const { data, success, errors } = validateWithSchema(
      baseEntrySchema,
      updatedExpense
    );

    if (!success) {
      setUpdateValidationError(errors);
      return;
    }

    if (
      data.name === selectedEntry?.name &&
      data.amount === selectedEntry.amount
    ) {
      setSelectedEntry(null);
      return;
    }

    updateExpense.mutate(
      { expense: data, expenseId, budgetId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setRequestError("Une erreur est survenue lors de la mise à jour"),
      }
    );
  };

  const handleDeleteExpense = (expenseId: string) => {
    setUpdateValidationError(null);
    setRequestError(null);

    deleteExpense.mutate(
      { expenseId, budgetId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setRequestError("Une erreur est survenue lors de la suppression"),
      }
    );
  };

  return (
    <>
      {addRequestError && (
        <ErrorMessage message="Une erreur interne est survenue" />
      )}
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
            <DataList<ExpenseEntry>
              data={weeklyExpenses}
              setSelectedEntry={setSelectedEntry}
              emptyMessage="Aucune dépense cette semaine"
            />
            <AddEntriesForm
              initialData={newExpenses}
              errors={validationError}
              onChange={setNewExpenses}
              onResetErrors={() => setValidationError(null)}
              type="expense"
            />
            {newExpenses.length > 0 && (
              <button
                onClick={handleAddExpenses}
                className="primary-btn"
                data-testid="submit-form-entry"
                disabled={addExpenses.isPending}
              >
                Enregistrer
              </button>
            )}
          </div>
        ) : (
          <DataList
            data={weeklyExpenses}
            emptyMessage="Aucune dépense cette semaine"
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
              validationErrors={updateValidationError}
              genericError={requestError}
              onSubmit={handleUpdateExpense}
              onDelete={handleDeleteExpense}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
