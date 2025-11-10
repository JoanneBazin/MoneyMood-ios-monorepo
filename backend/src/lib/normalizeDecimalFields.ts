import { Decimal } from "@prisma/client/runtime/library";

export const normalizeDecimalFields = (data: any): any => {
  if (Decimal.isDecimal(data)) {
    return data.toNumber();
  }

  if (data instanceof Date) {
    return data.toLocaleDateString("fr-FR");
  }

  if (Array.isArray(data)) {
    return data.map(normalizeDecimalFields);
  }

  if (typeof data === "object" && data !== null) {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      result[key] = normalizeDecimalFields(value);
    }
    return result;
  }

  return data;
};
