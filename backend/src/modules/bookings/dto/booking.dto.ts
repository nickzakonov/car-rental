import { ApiProperty } from '@nestjs/swagger';

export class BookingDto {
  @ApiProperty({ required: true })
  clientId: string;

  @ApiProperty({ required: true })
  carId: string;

  @ApiProperty({ format: 'date', required: false, description: '"YYYY-MM-DD"' })
  startDate: string;

  @ApiProperty({ format: 'date', required: false, description: '"YYYY-MM-DD"' })
  endDate: string;
}
