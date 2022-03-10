import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(5, { message: 'The min length of name is 5 characters' })
  @MaxLength(80, {
    message: 'The name can be up to 80 characters length',
  })
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be less than 20 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
    message: 'The password should contain at least one number and one character',
  })
  readonly password: string;
}
