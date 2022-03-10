import { ApiProperty } from '@nestjs/swagger';

export enum RegisterStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class RegisterResponse {
  @ApiProperty({ type: RegisterStatus, enum: RegisterStatus })
  status: RegisterStatus;
}
