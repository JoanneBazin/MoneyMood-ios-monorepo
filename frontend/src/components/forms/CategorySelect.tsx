import { getCategories } from "@/hooks/queries";
import { CategorySelectProps } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export const CategorySelect = ({
  budgetId,
  selectedCategory,
  setCategory,
}: CategorySelectProps) => {
  const queryClient = useQueryClient();
  const categories = getCategories(budgetId, queryClient);

  if (categories.length > 0) {
    return (
      <div className="mb-xs">
        <select
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Sélectionner une catégorie ?</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
};
