import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entity/user.entity';
import { sign } from 'jsonwebtoken';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UserResponseInterface } from './types/userResponse.interface';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOneBy({
      email: email,
    });
  }

  async createUser(newUser: UserEntity): Promise<UserEntity> {
    return await this.userRepo.save(newUser);
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: { id: id },
      relations: ['cards', 'comments', 'columns'],
    });
  }
}
