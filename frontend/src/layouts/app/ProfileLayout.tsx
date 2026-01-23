import { BackArrow, Banner } from "@/components/ui";
import { Outlet } from "react-router-dom";
import { Header, ProfileNavigation } from "../components";
import { useAppStore } from "@/stores/appStore";
import { useEffect } from "react";

export const ProfileLayout = () => {
  const { user, setPageTitle } = useAppStore();

  useEffect(() => {
    if (user) {
      setPageTitle(user?.email);
    }
  }, [user]);

  return (
    <div className="app-container">
      <BackArrow />
      <Header />

      <main>
        <Banner />
        <ProfileNavigation />
        <Outlet />
      </main>
    </div>
  );
};
