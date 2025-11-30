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

  async findByEmail() {}
}
