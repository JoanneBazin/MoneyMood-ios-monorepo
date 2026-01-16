import { BaseEntryOutput } from "@shared/schemas";
import {
  addFixedEntries,
  deleteFixedEntry,
  getFixedEntries,
  updateFixedEntry,
} from "./base";

export const fetchFixedIncomes = async () => getFixedEntries("incomes");

export const addFixedIncomes = async (incomes: BaseEntryOutput[]) =>
  addFixedEntries(incomes, "incomes");

export const updateFixedIncome = async (
  income: BaseEntryOutput,
  incomeId: string
) => updateFixedEntry(income, incomeId, "incomes");

export const deleteFixedIncome = async (incomeId: string) =>
  deleteFixedEntry(incomeId, "charges");

export const fetchFixedCharges = async () => getFixedEntries("charges");

export const addFixedCharges = async (charges: BaseEntryOutput[]) =>
  addFixedEntries(charges, "charges");

export const updateFixedCharge = async (
  charge: BaseEntryOutput,
  chargeId: string
) => updateFixedEntry(charge, chargeId, "charges");

export const deleteFixedCharge = async (chargeId: string) =>
  deleteFixedEntry(chargeId, "charges");
