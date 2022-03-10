import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './dto/login.response';
import { RegisterResponse, RegisterStatus } from './dto/register.response';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email is already taken' })
  @ApiOkResponse({ type: RegisterResponse })
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
    const { email } = registerDto;
    if (await this.userService.get(email)) throw new HttpException('Email is already taken', HttpStatus.CONFLICT);

    await this.userService.register(registerDto);

    return { status: RegisterStatus.SUCCESS };
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Access denied' })
  @ApiOkResponse({ type: LoginResponse })
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.userService.login(loginDto);
  }
}
