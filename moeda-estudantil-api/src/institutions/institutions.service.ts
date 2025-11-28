import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InstitutionsService {
  constructor(private readonly prismaService: PrismaService) {}

  getInstitutions(page?: number, limit?: number, name?: string) {
    return this.prismaService.institution.findMany({
      take: limit,
      skip: page && limit ? (page - 1) * limit : undefined,
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
    });
  }

  getInstitutionById(id: string) {
    return this.prismaService.institution.findUnique({
      where: { id },
    });
  }

  createInstitution(name: string) {
    return this.prismaService.institution.create({
      data: { name },
    });
  }

  updateInstitution(id: string, name: string) {
    return this.prismaService.institution.update({
      where: { id },
      data: { name },
    });
  }
}
