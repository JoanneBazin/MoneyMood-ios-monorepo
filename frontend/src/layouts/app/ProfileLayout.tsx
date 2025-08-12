import { BackArrow, Banner } from "@/components/ui";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

export const ProfileLayout = () => {
  return (
    <div className="app-container">
      <BackArrow />
      <Header />

      <main>
        <Banner />
        <Outlet />
      </main>
    </div>
  );
};
