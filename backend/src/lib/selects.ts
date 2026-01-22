export const userSelect = {
  id: true,
  name: true,
  email: true,
  enabledExpenseValidation: true,
};

export const budgetEntrySelect = {
  id: true,
  name: true,
  amount: true,
};

export const expenseEntrySelect = {
  id: true,
  name: true,
  amount: true,
  weekNumber: true,
  cashed: true,
};
export const specialExpenseEntrySelect = {
  id: true,
  name: true,
  amount: true,
  specialCategoryId: true,
  createdAt: true,
  cashed: true,
};

export const specialCategorySelect = {
  id: true,
  name: true,
  expenses: {
    select: {
      ...specialExpenseEntrySelect,
    },
  },
};

export const monthlyBudgetSelect = {
  id: true,
  month: true,
  year: true,
  isCurrent: true,
  remainingBudget: true,
  weeklyBudget: true,
  numberOfWeeks: true,
  incomes: {
    select: {
      ...budgetEntrySelect,
    },
  },
  charges: {
    select: {
      ...budgetEntrySelect,
    },
  },
  expenses: {
    select: {
      ...expenseEntrySelect,
    },
  },
};

export const specialBudgetSelect = {
  id: true,
  name: true,
  remainingBudget: true,
  totalBudget: true,
  createdAt: true,
  expenses: {
    where: { specialCategoryId: null },
    select: {
      ...specialExpenseEntrySelect,
    },
  },
  categories: {
    select: {
      ...specialCategorySelect,
    },
  },
};
