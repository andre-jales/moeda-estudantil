import { useQuery } from "@tanstack/react-query";
import loginManagerInstance from "../services";

export const useLoadUserInfo = () => {
  const { refetch, isLoading, data, error } = useQuery({
    enabled: false,
    queryKey: ["userInfo"],
    queryFn: async () => loginManagerInstance.getAuthenticatedUserInfo(),
  });

  return { refetch, isLoading, userInfo: data, error };
};
