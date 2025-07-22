"use client";
import { getUserDetail } from "@/app/action";
import { useFetchSubscriptions } from "@/hooks/subscriptions";
import { Subscription } from "@/hooks/subscriptions/types";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  readonly email?: string;
  readonly user_metadata?: Metadata;
  readonly id?: string;
};
type Metadata = {
  displayName?: string;
};
interface AppContextType {
  user: User;
  subscriptions: Subscription[];
  isPending: boolean;
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

  const { data: subscriptions, isPending } = useFetchSubscriptions(user?.id);

  return (
    <AppContext.Provider
      value={{
        user: user || {},
        subscriptions,
        isPending,
      }}
    >
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
