import { ApiProperty } from '@nestjs/swagger';

export class ReportItem {
  @ApiProperty()
  carId: string;

  @ApiProperty()
  bookedTime: number;
}

export class ReportResponse {
  @ApiProperty({ type: [ReportItem] })
  items: ReportItem[];

  @ApiProperty()
  totalBookedTime: number;
}
