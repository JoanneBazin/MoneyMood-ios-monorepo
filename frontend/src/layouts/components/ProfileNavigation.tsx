import { NavLink } from "react-router-dom";

export const ProfileNavigation = () => {
  return (
    <nav>
      <ul className="profile-nav">
        <li className="profile-nav__item">
          <NavLink
            to="/profile/budget"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Budgets mensuels
          </NavLink>
        </li>
        <li className="profile-nav__item">
          <NavLink
            to="/profile/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
            data-testid="profile-settings-nav"
          >
            Paramètres
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
