import { UpdateUserProfile } from "@/components/forms";
import { ErrorMessage } from "@/components/ui";
import { useSessionQuery } from "@/hooks/queries";

export const ProfileSettings = () => {
  const { data: user } = useSessionQuery();
  if (!user) return <ErrorMessage />;
  return (
    <section>
      <UpdateUserProfile user={user} />
    </section>
  );
};
