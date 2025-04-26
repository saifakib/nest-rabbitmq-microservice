import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterAuthDto): Promise<User> {
    const existingUser = await this.usersService.findOneByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    try {
      return await this.usersService.create({ ...registerDto, password: registerDto.password });
    } catch (error) {
      console.error('Error during registration:', error);
      throw new InternalServerErrorException('Could not register user');
    }
  }

  async login(loginDto: LoginAuthDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}