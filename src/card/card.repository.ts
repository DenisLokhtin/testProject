import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';
import { ColumnEntity } from '../column/entity/column.entity';
import { CreateCardDto } from './dto/createCard.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class CardRepositoryService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async findAll(columnId: number): Promise<CardEntity[]> {
    return this.cardRepository.find({
      where: {
        column: {
          id: columnId,
        },
      },
    });
  }

  async findOne(id: number, columnId: number): Promise<CardEntity> {
    return this.cardRepository.findOne({
      where: {
        column: {
          id: columnId,
        },
        id: id,
      },
      relations: ['column', 'author_'],
    });
  }

  async findOneColumn(columnId: number): Promise<ColumnEntity | null> {
    return this.columnRepository.findOne({
      where: {
        id: columnId,
      },
    });
  }

  async create(
    createCardDto: CreateCardDto,
    column: ColumnEntity,
    user: UserEntity,
  ): Promise<CardEntity> {
    return await this.cardRepository.save({
      ...createCardDto,
      column: column,
      author_: {
        id: user.id,
        email: user.email,
      },
    });
  }

  async update(card: CardEntity): Promise<CardEntity> {
    return this.cardRepository.save(card);
  }

  async remove(card: CardEntity): Promise<void> {
    await this.cardRepository.remove(card);
  }
}
