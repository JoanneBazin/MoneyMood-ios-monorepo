export const formatDateTitle = (
  year: number,
  month: number,
  locale = "fr-FR"
) => {
  const date = new Date(year, month - 1);
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);
};
