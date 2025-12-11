import { Injectable, BadRequestException } from '@nestjs/common';
import { Role, TransactionType } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private readonly prisma: PrismaService) {}

  async donateCoins(
    teacherId: string,
    dto: { studentId: string; amount: number; reason: string },
  ) {
    const { studentId, amount, reason } = dto;

    const teacher = await this.prisma.teacher.findUnique({
      where: { userId: teacherId },
    });

    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    if (teacher.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }
    const student = await this.prisma.student.findUnique({
      where: { userId: studentId },
    });

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    if (student.institutionId !== teacher.institutionId)
      throw new BadRequestException(
        'Student does not belong to the same institution',
      );

    await this.prisma.$transaction([
      this.prisma.teacher.update({
        where: { userId: teacherId },
        data: { balance: { decrement: amount } },
      }),
      this.prisma.student.update({
        where: { userId: studentId },
        data: { balance: { increment: amount } },
      }),
      this.prisma.transaction.create({
        data: {
          amount,
          description: reason,
          type: TransactionType.DONATION,
          teacherId: teacher.id,
          studentId: student.id,
        },
      }),
    ]);

    return { success: true };
  }

  async getTransactions(userId: string, role: Role) {
    if (role === 'TEACHER') {
      const teacher = await this.prisma.teacher.findUnique({
        where: { userId },
      });

      if (!teacher) throw new BadRequestException('Teacher not found');

      const transaction = await this.prisma.transaction.findMany({
        where: { teacherId: teacher.id },
        orderBy: { createdAt: 'desc' },
        include: {
          student: {
            select: { name: true, user: { select: { email: true } } },
          },
          teacher: {
            select: { name: true, user: { select: { email: true } } },
          },
        },
      });

      return transaction.map((tx) => ({
        ...tx,
        studentName: tx.student?.name || null,
        studentEmail: tx.student?.user.email || null,
        teacherName: tx.teacher?.name || null,
        teacherEmail: tx.teacher?.user.email || null,
      }));
    } else {
      const student = await this.prisma.student.findUnique({
        where: { userId },
      });
      if (!student) throw new BadRequestException('Student not found');

      return this.prisma.transaction.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: 'desc' },
      });
    }
  }

  async redeemReward(studentId: string, rewardId: string) {
    const student = await this.prisma.student.findUnique({
      where: { userId: studentId },
    });
    if (!student) throw new BadRequestException('Student not found');

    const reward = await this.prisma.reward.findUnique({
      where: { id: rewardId },
    });
    if (!reward || !reward.isActive)
      throw new BadRequestException('Reward not available');

    if (student.balance < reward.amount)
      throw new BadRequestException('Insufficient balance');

    await this.prisma.$transaction([
      this.prisma.student.update({
        where: { userId: studentId },
        data: { balance: { decrement: reward.amount } },
      }),
      this.prisma.transaction.create({
        data: {
          amount: reward.amount,
          description: `Resgate de: ${reward.name}`,
          type: TransactionType.REWARD,
          studentId: student.id,
          rewardId: reward.id,
        },
      }),
    ]);

    return { success: true };
  }

  async getAvailableRewards() {
    return this.prisma.reward.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getInstitutionStudents(teacherId: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { userId: teacherId },
    });

    if (!teacher) throw new BadRequestException('Teacher not found');

    const students = await this.prisma.student.findMany({
      where: { institutionId: teacher.institutionId },
      orderBy: { name: 'asc' },
      include: { user: true },
    });

    return students.map((student) => ({
      id: student.userId,
      name: student.name,
      course: student.course,
      email: student.user.email,
    }));
  }
}
