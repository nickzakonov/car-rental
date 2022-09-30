import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Booking {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @ApiProperty()
  clientId: string;

  @Column()
  @ApiProperty()
  carId: string;

  @Column({ type: 'daterange' })
  @ApiProperty()
  bookingPeriod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  cost: number;
}
