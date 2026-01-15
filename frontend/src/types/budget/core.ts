export interface BudgetStore {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  reset: () => void;
}
