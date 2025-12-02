import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "../utils/constants";
import loginManagerInstance from "../services";

export const useAuth = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: (data: { email: string; password: string }) =>
      loginManagerInstance.login(data.email, data.password),
  });

  return { mutateAsync, isPending };
};
