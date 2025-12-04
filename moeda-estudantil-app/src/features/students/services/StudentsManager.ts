import type { IStudentsRepository } from "../types/IStudentsRepository";

export class StudentsManager {
  private repository: IStudentsRepository;

  constructor(repository: IStudentsRepository) {
    this.repository = repository;
  }

  getStudents(page?: number, limit?: number, name?: string) {
    return this.repository.getAllStudents({ page, limit, name });
  }

  getStudentById(id: string) {
    return this.repository.getStudentById(id);
  }

  createStudent(
    email: string,
    password: string,
    name: string,
    cpf: string,
    address: string,
    course: string,
    institutionId: string
  ) {
    return this.repository.createStudent({
      email,
      password,
      name,
      cpf,
      address,
      course,
      institutionId,
    });
  }

  updateStudent(
    id: string,
    name: string,
    email: string,
    cpf: string,
    address: string,
    course: string,
    institutionId: string
  ) {
    return this.repository.updateStudent({
      id,
      name,
      email,
      cpf,
      address,
      course,
      institutionId,
    });
  }
}
