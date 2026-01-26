import { addFixedEntries, deleteFixedEntry, updateFixedEntry } from "@/lib/api";
import {
  AddFixedEntriesParams,
  DeleteFixedEntryParams,
  Entry,
  UpdateFixedEntryParams,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFixedEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ entries, type }: AddFixedEntriesParams) =>
      addFixedEntries(entries, type),
    onSuccess: (entries, variables) => {
      if (variables.type === "charges") {
        queryClient.setQueryData(["fixedCharges"], (prev: Entry[]) => [
          ...prev,
          ...entries,
        ]);
      } else if (variables.type === "incomes") {
        queryClient.setQueryData(["fixedIncomes"], (prev: Entry[]) => [
          ...prev,
          ...entries,
        ]);
      }
    },
  });
};

export const useUpdateFixedEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entry, entryId, type }: UpdateFixedEntryParams) =>
      updateFixedEntry(entry, entryId, type),
    onSuccess: (updatedEntry, variables) => {
      if (variables.type === "charges") {
        queryClient.setQueryData(["fixedCharges"], (prev: Entry[]) =>
          prev.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry,
          ),
        );
      } else if (variables.type === "incomes") {
        queryClient.setQueryData(["fixedIncomes"], (prev: Entry[]) =>
          prev.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry,
          ),
        );
      }
    },
  });
};

export const useDeleteFixedEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entryId, type }: DeleteFixedEntryParams) =>
      deleteFixedEntry(entryId, type),
    onSuccess: (result, variables) => {
      if (variables.type === "charges") {
        queryClient.setQueryData(["fixedCharges"], (prev: Entry[]) =>
          prev.filter((entry) => entry.id !== result.id),
        );
      } else if (variables.type === "incomes") {
        queryClient.setQueryData(["fixedIncomes"], (prev: Entry[]) =>
          prev.filter((entry) => entry.id !== result.id),
        );
      }
    },
  });
};
