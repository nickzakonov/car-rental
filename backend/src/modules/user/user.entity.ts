import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
@Index(['name'], { unique: true })
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  password: string;
}
