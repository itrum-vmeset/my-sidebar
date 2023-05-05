import { useMemo } from "react";

export const useClients = (clients: any, query: string) => {
  const searchedClients = useMemo(() => {
    return clients.filter(
      (client: any) =>
        client.fullName.toLowerCase().includes(query.toLowerCase()) ||
        client?.email?.toLowerCase().includes(query.toLowerCase()) ||
        client?.phone?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return searchedClients;
};
