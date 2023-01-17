import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';
import { ColumnEntity } from '../column/entity/column.entity';
import { CreateCardDto } from './dto/createCard.dto';
import { Repository } from 'typeorm';
import { UpdateCardDto } from './dto/updateCard.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class CardService {
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

  async create(
    createCardDto: CreateCardDto,
    columnId: number,
    user: UserEntity,
  ): Promise<CardEntity> {
    const column = await this.columnRepository.findOne({
      where: { id: columnId },
    });
    if (!column) throw new NotFoundException('Column not found');
    const card = this.cardRepository.create({
      ...createCardDto,
      column: column,
      author_: {
        id: user.id,
        email: user.email,
      },
    });
    return this.cardRepository.save(card);
  }

  async update(
    id: number,
    updateCardDto: UpdateCardDto,
    columnId: number,
  ): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({
      where: {
        column: {
          id: columnId,
        },
        id: id,
      },
    });
    if (!card) throw new NotFoundException('Card not found');
    if (updateCardDto.title) card.title = updateCardDto.title;
    if (updateCardDto.text) card.text = updateCardDto.text;
    return this.cardRepository.save(card);
  }

  async remove(id: number, columnId: number): Promise<void> {
    const card = await this.cardRepository.findOne({
      where: {
        column: {
          id: columnId,
        },
        id: id,
      },
    });
    if (!card) throw new NotFoundException();
    await this.cardRepository.remove(card);
  }
}
