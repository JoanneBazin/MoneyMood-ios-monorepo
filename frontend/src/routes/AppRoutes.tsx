import { Route, Routes } from "react-router-dom";
import { PrivateAppLayout } from "../layouts/app/PrivateAppLayout";
import { Dashboard } from "../pages/app/Dashboard";
import { CreateBudget } from "../pages/app/CreateBudget";
import { History } from "../pages/app/History";
import { ProfileLayout } from "../layouts/app/ProfileLayout";
import { Profile } from "../pages/profile/Profile";
import { NotFound } from "../pages/NotFound";

import { LoginPage } from "@/pages/public/LoginPage";
import { SignupPage } from "@/pages/public/SignupPage";
import { HomeRedirect } from "@/components/auth/HomeRedirect";
import { RequireGuest } from "@/components/auth/RequireGuest";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Projects } from "@/pages/app/Projects";
import { ProjectDetail } from "@/pages/app/ProjectDetail";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<RequireGuest />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path={"/app"} element={<PrivateAppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateBudget />} />
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path=":id" element={<ProjectDetail />} />
          </Route>
          <Route path="history" element={<History />} />
        </Route>

        <Route element={<ProfileLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
