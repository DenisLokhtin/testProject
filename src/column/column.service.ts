import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './entity/column.entity';
import { CreateColumnDto } from './dto/createColumn.dto';
import { UpdateColumnDto } from './dto/updateColumn.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async findAll() {
    return await this.columnRepository.find();
  }

  async findOne(id: number) {
    return await this.columnRepository.findOne({
      where: { id: id },
      relations: { author_: true, cards: true },
    });
  }

  async create(column: CreateColumnDto, user: UserEntity) {
    return await this.columnRepository.save({
      title: column.title,
      author_: {
        id: user.id,
        email: user.email,
      },
    });
  }

  async update(id: number, column: UpdateColumnDto) {
    await this.columnRepository.update(id, column);
    return await this.columnRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    await this.columnRepository.delete(id);
    return { deleted: true };
  }
}
