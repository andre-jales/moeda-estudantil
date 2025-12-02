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
