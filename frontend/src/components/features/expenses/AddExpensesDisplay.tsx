import { AddEntriesForm } from "@/components/forms";
import { AddExpensesParams, ExpensesResponse } from "@/types";
import { BaseEntryForm, validateArrayWithSchema } from "@shared/schemas";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { ZodSchema } from "zod";

interface AddExpensesProps<TFormValues> {
  addExpenses: UseMutationResult<
    ExpensesResponse<TFormValues>,
    Error,
    AddExpensesParams
  >;
  schema: ZodSchema<TFormValues>;
  setRequestError: (err: string | null) => void;
}

export const AddExpensesDisplay = <TFormValues,>({
  addExpenses,
  schema,
  setRequestError,
  weekNumber,
}: AddExpensesProps<TFormValues>) => {
  const [newExpenses, setNewExpenses] = useState<BaseEntryForm[]>([]);
  const [validationError, setValidationError] = useState<
    Record<string, string>[] | null
  >(null);
  const handleAddExpenses = () => {
    setValidationError(null);
    setRequestError(null);

    const newWeeklyExpenses = newExpenses.map((exp) => ({
      ...exp,
      weekNumber,
    }));

    const validation = validateArrayWithSchema(schema, newWeeklyExpenses);
    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addExpenses.mutate(
      { expenses: validation.data, budgetId },
      {
        onSuccess: () => setNewExpenses([]),
        onError: () =>
          setRequestError("Une erreur est survenue lors de l'ajout"),
      }
    );
  };
  return (
    <div>
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
          disabled={addExpenses && addExpenses.isPending}
        >
          Enregistrer
        </button>
      )}
    </div>
  );
};
