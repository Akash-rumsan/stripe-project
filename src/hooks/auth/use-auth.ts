import { signOutAction } from "@/app/action";

export const useAuth = () => {
  const handleLogout = async () => {
    localStorage.clear();
    await signOutAction();
  };
  return { handleLogout };
};
