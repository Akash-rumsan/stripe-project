"use client";
import { getUserDetail } from "@/app/action";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  readonly email?: string;
  readonly user_metadata?: Metadata;
};
type Metadata = {
  displayName?: string;
};
interface AppContextType {
  user: User;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserDetail();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user: user || {} }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(" useAppContext must be used within an AppProvider");
  }
  return context;
};
