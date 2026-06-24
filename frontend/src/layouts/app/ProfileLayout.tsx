import { BackArrow, Banner } from "@/components/ui";
import { Outlet } from "react-router-dom";
import { Header, OfflineBanner, ProfileNavigation } from "../components";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { useSessionQuery } from "@/hooks/queries";
import { usePageTitle } from "@/hooks/usePageTitle";

export const ProfileLayout = () => {
  const { data: user } = useSessionQuery();
  const { isOffline } = useOfflineStatus();

  usePageTitle(user!.email!);

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
