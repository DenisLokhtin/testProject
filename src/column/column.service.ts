import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/createColumn.dto';
import { UpdateColumnDto } from './dto/updateColumn.dto';
import { UserEntity } from '../user/entity/user.entity';
import { ColumnRepositoryService } from './column.repository';

@Injectable()
export class ColumnService {
  constructor(
    private readonly columnRepositoryService: ColumnRepositoryService,
  ) {}

  async findAll() {
    return await this.columnRepositoryService.findAll();
  }

  async findOne(id: number) {
    return await this.columnRepositoryService.findOne(id);
  }

  async create(column: CreateColumnDto, user: UserEntity) {
    return await this.columnRepositoryService.create(column, user);
  }

  async update(id: number, column: UpdateColumnDto) {
    const columnCheck = await this.columnRepositoryService.findOne(id);
    if (!columnCheck) throw new NotFoundException('column not found');
    await this.columnRepositoryService.update(id, column);
    return await this.columnRepositoryService.findOne(id);
  }

  async remove(id: number) {
    return await this.columnRepositoryService.remove(id);
  }
}
