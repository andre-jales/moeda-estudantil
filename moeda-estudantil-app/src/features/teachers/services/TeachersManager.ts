import type { ITeachersRepository } from "../types/ITeachersRepository";
import type { ICreateTeacher } from "../types/ITeacher";

export class TeachersManager {
  private repository: ITeachersRepository;

  constructor(repository: ITeachersRepository) {
    this.repository = repository;
  }

  getTeachers(page?: number, limit?: number, name?: string) {
    return this.repository.getAllTeachers({ page, limit, name });
  }

  getTeacherById(id: string) {
    return this.repository.getTeacherById(id);
  }

  createTeacher(payload: ICreateTeacher) {
    return this.repository.createTeacher(payload);
  }

  updateTeacher(
    id: string,
    name: string,
    email: string,
    cpf: string,
    institutionId: string,
    isActive: boolean,
    password?: string
  ) {
    return this.repository.updateTeacher({
      id,
      name,
      email,
      cpf,
      institutionId,
      isActive,
      password,
    });
  }
}
