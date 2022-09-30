import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({
    format: 'date',
    required: true,
    description: 'Введите любую дату в интересующем месяце (например, 2022-09-01)',
  })
  date: string;
}
