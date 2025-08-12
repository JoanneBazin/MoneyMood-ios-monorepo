import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { CollapseProps } from "@/types";

export const Collapse = ({ data, title, color }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`collapse ${color}`}>
      <div className="collapse__title">
        <p>{title}</p>
        <button
          aria-label={`Voir les ${title}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDownIcon />
        </button>
      </div>

      {isOpen && (
        <div className="p-xxs">
          {data.map((entry) => (
            <div key={entry.id} className="collapse__content">
              <p>{entry.name}</p>
              <p className={`collapse__content__amount ${color}`}>
                <span>€</span>
                {entry.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
