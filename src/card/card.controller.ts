import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CardEntity } from './entity/card.entity';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CardService } from './card.service';
import { UserDecorator } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/entity/user.entity';

@ApiTags('Cards')
@Controller('columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @ApiOperation({ summary: 'Find all cards for a specific column' })
  @ApiResponse({
    status: 200,
    description: 'Return all cards for the column',
    type: CardEntity,
    isArray: true,
  })
  async findAll(@Param('columnId') columnId: number): Promise<CardEntity[]> {
    return this.cardService.findAll(columnId);
  }

  @Get(':cardId')
  @ApiOperation({ summary: 'Find a card by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the card',
    type: CardEntity,
  })
  async findOne(
    @Param('cardId') cardId: number,
    @Param('columnId') columnId: number,
  ): Promise<CardEntity> {
    return this.cardService.findOne(cardId, columnId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created.',
  })
  async create(
    @Body() createCardDto: CreateCardDto,
    @Param('columnId') columnId: number,
    @UserDecorator() user: UserEntity,
  ): Promise<CardEntity> {
    return this.cardService.create(createCardDto, columnId, user);
  }

  @Patch(':cardId')
  @ApiOperation({ summary: 'Update a card' })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully updated.',
  })
  async update(
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto,
    @Param('columnId') columnId: number,
  ): Promise<CardEntity> {
    return this.cardService.update(cardId, updateCardDto, columnId);
  }

  @Delete(':cardId')
  @ApiOperation({ summary: 'Delete a card' })
  @ApiResponse({
    status: 204,
    description: 'The card has been successfully deleted.',
  })
  async remove(
    @Param('cardId') cardId: number,
    @Param('columnId') columnId: number,
  ): Promise<void> {
    return this.cardService.remove(cardId, columnId);
  }
}
