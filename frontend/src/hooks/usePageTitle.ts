import { useAppStore } from "@/stores/appStore";
import { useEffect } from "react";

export const usePageTitle = (title: string) => {
  const setPageTitle = useAppStore((s) => s.setPageTitle);

  useEffect(() => {
    setPageTitle(title);
  }, [title, setPageTitle]);
};
