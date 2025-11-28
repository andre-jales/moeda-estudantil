import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('student')
  createStudent(@Body() createStudentDTO: CreateStudentDTO) {
    return this.usersService.createStudent(createStudentDTO);
  }
}
