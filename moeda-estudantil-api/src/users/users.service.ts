import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDTO } from './dto/create-student-dto';
import { hashPassword } from 'src/common/utils/password.utils';
import { Role } from 'generated/prisma/enums';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createStudent(studentDto: CreateStudentDTO) {
    const { email, password, institutionId, ...studentInfo } = studentDto;

    const hashedPassword = await hashPassword(password);

    const userData = {
      email,
      password: hashedPassword,
      role: Role.STUDENT,
    };

    const studentData = {
      ...studentInfo,
      institution: {
        connect: { id: institutionId },
      },
      user: {
        create: userData,
      },
    };

    const createdStudent = await this.prismaService.student.create({
      data: studentData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return createdStudent;
  }

  async getStudents(page = 1, limit = 10, name?: string) {
    const total = await this.prismaService.student.count({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
    });

    const students = await this.prismaService.student.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
      orderBy: { name: 'asc' },
      select: {
        name: true,
        cpf: true,
        address: true,
        course: true,
        institutionId: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    const items = students.map((student) => ({
      id: student.user.id,
      email: student.user.email,
      role: student.user.role,
      createdAt: student.user.createdAt,
      updatedAt: student.user.updatedAt,
      name: student.name,
      cpf: student.cpf,
      address: student.address,
      course: student.course,
      institutionId: student.institutionId,
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async getStudentById(id: string) {
    const student = await this.prismaService.student.findUnique({
      where: { userId: id },
      select: {
        name: true,
        cpf: true,
        address: true,
        course: true,
        institutionId: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!student) {
      return null;
    }

    return {
      id: student.user.id,
      email: student.user.email,
      role: student.user.role,
      createdAt: student.user.createdAt,
      updatedAt: student.user.updatedAt,
      name: student.name,
      cpf: student.cpf,
      address: student.address,
      course: student.course,
      institutionId: student.institutionId,
    };
  }

  async updateStudent(id: string, updateStudentDTO: CreateStudentDTO) {
    const updatedStudent = await this.prismaService.student.update({
      where: { userId: id },
      data: {
        name: updateStudentDTO.name,
        cpf: updateStudentDTO.cpf,
        address: updateStudentDTO.address,
        course: updateStudentDTO.course,
        institutionId: updateStudentDTO.institutionId,
      },
    });

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        email: updateStudentDTO.email,
        ...(updateStudentDTO.password && {
          password: await hashPassword(updateStudentDTO.password),
        }),
        role: Role.STUDENT,
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
      name: updatedStudent.name,
      cpf: updatedStudent.cpf,
      address: updatedStudent.address,
      course: updatedStudent.course,
      institutionId: updatedStudent.institutionId,
    };
  }

  async createTeacher() {}

  async createCompany() {}

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      select: {
        id: true,
        role: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        company: true,
        student: true,
        teacher: true,
      },
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      ...(user.role === Role.STUDENT && {
        name: user.student?.name,
        course: user.student?.course,
      }),
      ...(user.role === Role.TEACHER && {
        name: user.teacher?.name,
      }),
      ...(user.role === Role.COMPANY && {
        name: user.company?.name,
      }),
    };
  }
}
