import { Role } from 'generated/prisma/enums';

export class JwtPayloadDTO {
  id: string;
  email: string;
  role: Role;
}
