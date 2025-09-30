// packages/lib/src/ApiProvider.tsx
import { createContext, useContext, type ReactNode } from "react";

import { AppApi } from "@repo/lib/api_call/AppApi";

interface ApiContextValue {
  api: AppApi;
}

const ApiContext = createContext<ApiContextValue | null>(null);

export const ApiProvider = ({
  baseUrl,
  children,
}: {
  baseUrl: string;
  children: ReactNode;
}) => {
  const api = new AppApi(baseUrl);
  return <ApiContext.Provider value={{api}}> {children} </ApiContext.Provider>;
};

export const useApi = (): ApiContextValue => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within ApiProvider");
  }
  return context;
};
