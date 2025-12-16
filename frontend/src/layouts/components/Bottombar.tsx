import { CalendarPlus, History, LayoutDashboard, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Bottombar = () => {
  return (
    <nav className="bottom-nav">
      <ul>
        <li>
          <NavLink
            to="/app"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            <LayoutDashboard />
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/create"
            className={({ isActive }) => (isActive ? "active" : "")}
            data-testid="create-nav"
          >
            <CalendarPlus />
            <p>Nouveau mois</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/projects"
            className={({ isActive }) => (isActive ? "active" : "")}
            data-testid="projects-nav"
          >
            <Sparkles />
            <p>Projets</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/history"
            className={({ isActive }) => (isActive ? "active" : "")}
            data-testid="history-nav"
          >
            <History />
            <p>Historique</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
