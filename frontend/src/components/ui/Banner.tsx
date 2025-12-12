import { useBudgetStore } from "@/stores/budgetStore";
import { useUserStore } from "@/stores/userStore";

export const Banner = () => {
  const pageTitle = useBudgetStore((s) => s.pageTitle);
  const user = useUserStore((s) => s.user);

  const avatarLetter = user?.name.split("")[0];

  return (
    <div className="banner" data-testid="app-banner">
      <div className="banner__avatar">
        <p>{avatarLetter}</p>
      </div>
      <div>
        <p className="banner__user-name">{user?.name}</p>
        <h1 className="banner__title">{pageTitle}</h1>
      </div>
    </div>
  );
};
