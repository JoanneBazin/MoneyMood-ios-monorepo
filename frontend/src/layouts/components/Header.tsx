import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useLogoutMutation } from "@/hooks/queries/mutations";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatedMenu } from "@/components/ui/AnimateMenu";
import { AnimatePresence } from "motion/react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const { mutate, isPending, error } = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    mutate(undefined, { onSuccess: () => navigate("/") });
  };
  return (
    <header>
      <div className="app-header" ref={dropdownRef}>
        <button
          className="app-header__burger-menu"
          data-testid="nav-menu"
          aria-label="Ouvrir/fermer le menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="close-icon" />
          ) : (
            <AlignJustify className="burger-icon" />
          )}
        </button>
        <AnimatePresence>
          {isOpen && (
            <AnimatedMenu menu="nav">
              <div className="app-header__content">
                <nav>
                  <ul className="nav-items">
                    <li>
                      <NavLink
                        to="/app"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Gérer mes budgets
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Profil
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="gray-500"
                        data-testid="logout-btn"
                        disabled={isPending}
                      >
                        Déconnexion
                      </button>
                    </li>
                    {error && <p className="form-error">{error.message}</p>}
                  </ul>
                </nav>
              </div>
            </AnimatedMenu>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
