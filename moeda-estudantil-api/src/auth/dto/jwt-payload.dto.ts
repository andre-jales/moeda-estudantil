import { Role } from 'generated/prisma/enums';

export class JwtPayloadDTO {
  sub: string;
  username: string;
  role: Role;
}
