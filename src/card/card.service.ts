import { Injectable, NotFoundException } from '@nestjs/common';
import { CardEntity } from './entity/card.entity';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { UserEntity } from '../user/entity/user.entity';
import { CardRepositoryService } from './card.repository';

@Injectable()
export class CardService {
  constructor(private readonly cardRepositoryService: CardRepositoryService) {}

  async findAll(columnId: number): Promise<CardEntity[]> {
    return this.cardRepositoryService.findAll(columnId);
  }

  async findOne(id: number, columnId: number): Promise<CardEntity> {
    return this.cardRepositoryService.findOne(id, columnId);
  }

  async create(
    createCardDto: CreateCardDto,
    columnId: number,
    user: UserEntity,
  ): Promise<CardEntity> {
    const column = await this.cardRepositoryService.findOneColumn(columnId);
    if (!column) throw new NotFoundException('column not found');
    return await this.cardRepositoryService.create(createCardDto, column, user);
  }

  async update(
    id: number,
    updateCardDto: UpdateCardDto,
    columnId: number,
  ): Promise<CardEntity> {
    const card = await this.cardRepositoryService.findOne(id, columnId);
    if (!card) throw new NotFoundException('Card not found');
    if (updateCardDto.title) card.title = updateCardDto.title;
    if (updateCardDto.text) card.text = updateCardDto.text;
    return this.cardRepositoryService.update(card);
  }

  async remove(id: number, columnId: number): Promise<void> {
    const card = await this.cardRepositoryService.findOne(id, columnId);
    if (!card) throw new NotFoundException();
    await this.cardRepositoryService.remove(card);
  }
}
