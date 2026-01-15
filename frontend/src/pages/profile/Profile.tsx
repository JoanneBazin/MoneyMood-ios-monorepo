import { FixedChargesDisplay } from "@/components/features/fixed-entries/FixedChargesDisplay";
import { FixedIncomesDisplay } from "@/components/features/fixed-entries/FixedIncomesDisplay";
import { useAppStore } from "@/stores/appStore";
import { useEffect } from "react";

export const Profile = () => {
  const { user, setPageTitle } = useAppStore();

  useEffect(() => {
    if (user) {
      setPageTitle(user?.email);
    }
  }, []);

  return (
    <section className="my-2xl">
      <FixedIncomesDisplay />
      <FixedChargesDisplay />
    </section>
  );
};
