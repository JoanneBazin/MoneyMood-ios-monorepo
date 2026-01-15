import { useAppStore } from "@/stores/appStore";

export const Banner = () => {
  const { user, pageTitle } = useAppStore();

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
