import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "../utils/constants";
import loginManagerInstance from "../services";

export const useAuth = (onSuccess: (token: string) => void) => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: (data: { email: string; password: string }) =>
      loginManagerInstance.login(data.email, data.password),
    onSuccess: onSuccess,
  });

  return { mutateAsync, isPending };
};
