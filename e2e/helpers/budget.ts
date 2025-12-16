export const displayedDate = (year: number, month: number) => {
  const date = new Date(year, month - 1);
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
};
