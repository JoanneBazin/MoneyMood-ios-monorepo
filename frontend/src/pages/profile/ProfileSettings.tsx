import { UpdateUserProfile } from "@/components/forms";
import { ErrorMessage } from "@/components/ui";
import { useAppStore } from "@/stores/appStore";

export const ProfileSettings = () => {
  const user = useAppStore((s) => s.user);
  if (!user) return <ErrorMessage />;
  return (
    <section>
      <UpdateUserProfile user={user} />
    </section>
  );
};
