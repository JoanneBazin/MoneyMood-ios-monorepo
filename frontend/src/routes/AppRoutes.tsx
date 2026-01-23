import { HomeRedirect, RequireAuth, RequireGuest } from "@/components/auth";
import { PrivateAppLayout, ProfileLayout } from "@/layouts/app";
import {
  CreateBudget,
  Dashboard,
  History,
  HistoryDetail,
  LoginPage,
  NotFound,
  ProfileBudget,
  ProfileSettings,
  ProjectDetail,
  Projects,
  SignupPage,
} from "@/pages";
import { Navigate, Route, Routes } from "react-router-dom";

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
          <Route path="history">
            <Route index element={<History />} />
            <Route path=":id" element={<HistoryDetail />} />
          </Route>
        </Route>

        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<Navigate to="budget" replace />} />
          <Route path="/profile/budget" element={<ProfileBudget />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
