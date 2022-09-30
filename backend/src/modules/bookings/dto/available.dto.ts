import { ApiProperty } from '@nestjs/swagger';

export class AvailableDto {
  @ApiProperty({ required: true })
  carId: string;

  @ApiProperty({ format: 'date', required: true, description: '"YYYY-MM-DD"' })
  startDate: string;

  @ApiProperty({ format: 'date', required: true, description: '"YYYY-MM-DD"' })
  endDate: string;
}
