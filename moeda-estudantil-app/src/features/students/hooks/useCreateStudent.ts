import { useMutation } from "@tanstack/react-query";
import type { ICreateStudent } from "../types/IStudent";
import studentsManagerInstance from "../services";

export const useCreateStudent = () => {
  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationKey: ["create-student"],
    mutationFn: async (data: ICreateStudent) => {
      await studentsManagerInstance.createStudent(
        data.email,
        data.password,
        data.name,
        data.cpf,
        data.address,
        data.course,
        data.institutionId
      );
    },
  });

  return {
    isPending,
    error,
    mutate,
    mutateAsync,
  };
};
