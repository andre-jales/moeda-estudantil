import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetAllInstitutionsDTO } from './dto/get-all-institutions.dto';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDTO } from './dto/create-institution.dto';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  getInstitutions(@Query() query: GetAllInstitutionsDTO) {
    return this.institutionsService.getInstitutions(
      query.page,
      query.limit,
      query.name,
    );
  }

  @Get(':id')
  getInstitutionById(@Param('id') id: string) {
    return this.institutionsService.getInstitutionById(id);
  }

  @Post()
  createInstitution(@Body() createInstitutionDTO: CreateInstitutionDTO) {
    return this.institutionsService.createInstitution(
      createInstitutionDTO.name,
    );
  }

  @Put(':id')
  updateInstitution(
    @Param('id') id: string,
    @Body() updateInstitutionDTO: CreateInstitutionDTO,
  ) {
    return this.institutionsService.updateInstitution(
      id,
      updateInstitutionDTO.name,
    );
  }
}
