import { useEffect, useState } from "react";
import {
  createExpenseEntrySchema,
  ExpenseEntry,
  expenseEntrySchema,
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
import {
  NewBudgetEntry,
  UpdatedExpenseEntry,
  WeeklyExpensesDisplayProps,
} from "@/types";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { getCurrentWeek } from "@/lib/weeks-helpers";

export const WeeklyExpensesDisplay = ({
  budgetId,
  weeklyBudget,
  expenses,
  edit = true,
  oldDate,
}: WeeklyExpensesDisplayProps) => {
  const [newExpenses, setNewExpenses] = useState<NewBudgetEntry[]>([]);
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
  const genericAddError = addExpenses.isError;
  const [genericUpdateError, setGenericUpdateError] = useState<string | null>(
    null
  );
  const [genericDeleteError, setGenericDeleteError] = useState<string | null>(
    null
  );

  useEffect(() => {
    setNewExpenses([]);
  }, [weekIndex]);

  const handleAddExpenses = () => {
    setValidationError(null);

    const newWeeklyExpenses = newExpenses.map((exp) => ({
      ...exp,
      weekNumber: currentWeekNumber,
    }));

    const validation = validateArrayWithSchema(
      createExpenseEntrySchema,
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

  const handleUpdateExpense = (updatedExpense: UpdatedExpenseEntry) => {
    setUpdateValidationError(null);
    setGenericUpdateError(null);

    const validation = validateWithSchema(expenseEntrySchema, updatedExpense);

    if (!validation.success) {
      setUpdateValidationError(validation.errors);
      return;
    }

    updateExpense.mutate(
      { expense: validation.data, budgetId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setGenericUpdateError(
            "Une erreur est survenue lors de la mise à jour"
          ),
      }
    );
  };

  const handleDeleteExpense = (deletedExpense: ExpenseEntry) => {
    setUpdateValidationError(null);
    setGenericDeleteError(null);

    deleteExpense.mutate(
      { expenseId: deletedExpense.id, budgetId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setGenericDeleteError(
            "Une erreur est survenue lors de la suppression"
          ),
      }
    );
  };

  return (
    <>
      {genericAddError && (
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
            <DataList
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
              genericError={genericUpdateError || genericDeleteError}
              onSubmit={handleUpdateExpense}
              onDelete={handleDeleteExpense}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
