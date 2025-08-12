import { useSessionQuery } from "@/hooks/queries";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useSessionQuery();

  return children;
};
