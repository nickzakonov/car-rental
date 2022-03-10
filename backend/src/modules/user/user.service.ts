import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login.response';

@Injectable()
export class UserService {
  constructor(@InjectConnection() private readonly connection: Connection, private readonly jwtService: JwtService) {}

  public async get(email: string): Promise<User> {
    return await this.connection.getRepository<User>(User).findOne({ where: { email } });
  }

  public async register(dto: RegisterDto): Promise<User> {
    const { password, ...rest } = dto;
    return this.connection.getRepository<User>(User).save({ password: await bcrypt.hash(password, 10), ...rest });
  }

  public async login(dto: LoginDto): Promise<LoginResponse> {
    const { email, password } = dto;

    const user = await this.connection.getRepository<User>(User).findOne({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user?.password)))
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);

    return { token: this.jwtService.sign({ id: user.id, name: user.name, email: user.email }) };
  }
}
