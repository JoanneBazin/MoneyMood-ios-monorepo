import { BackArrow, Banner } from "@/components/ui";
import { Outlet } from "react-router-dom";
import { Header, OfflineBanner, ProfileNavigation } from "../components";
import { useAppStore } from "@/stores/appStore";
import { useEffect } from "react";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";

export const ProfileLayout = () => {
  const { user, setPageTitle } = useAppStore();
  const { isOffline } = useOfflineStatus();

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
        {isOffline && <OfflineBanner />}

        <Outlet />
      </main>
    </div>
  );
};
