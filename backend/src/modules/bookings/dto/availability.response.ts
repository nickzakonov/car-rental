import { ApiProperty } from '@nestjs/swagger';

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export class AvailabilityResponse {
  @ApiProperty({ type: AvailabilityStatus, enum: AvailabilityStatus })
  status: AvailabilityStatus;

  @ApiProperty()
  cost: number;
}
