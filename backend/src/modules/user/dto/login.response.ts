import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  token: string;
}
