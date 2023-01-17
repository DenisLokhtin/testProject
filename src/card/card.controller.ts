import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
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
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { UserDecorator } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { AuthGuard } from '../user/guards/user.guard';
import { cardAuthor } from '../user/guards/cardAuthor.guard';

@ApiTags('Cards')
@Controller('columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Find all cards for a specific column' })
  @ApiResponse({
    status: 200,
    description: 'Return all cards for the column',
    schema: {
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'id',
            example: '42',
          },
          title: {
            type: 'string',
            description: 'title of card',
            example: 'news',
          },
          text: {
            type: 'string',
            description: 'text of card',
            example: 'test text',
          },
        },
      },
    },
  })
  async findAll(@Param('columnId') columnId: number): Promise<CardEntity[]> {
    return this.cardService.findAll(columnId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':cardId')
  @ApiOperation({ summary: 'Find a card by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the card',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'id',
          example: '42',
        },
        title: {
          type: 'text',
          description: 'title of card',
          example: 'news',
        },
        text: {
          type: 'string',
          description: 'text of card',
          example: 'test text',
        },
        author_: {
          type: 'object',
          description: 'author object',
          example: {
            id: 1,
            email: 'John@gmail.com',
            password:
              '$2b$10$.275k5seNCfHq1CE0EmPDOJkozr2QEJNFH8JSaYAdErmqN.MRXv9G',
            access_token: null,
          },
        },
        column: {
          type: 'object',
          description: 'object of column',
          example: {
            id: 1,
            title: 'news2',
          },
        },
      },
    },
  })
  async findOne(
    @Param('cardId') cardId: number,
    @Param('columnId') columnId: number,
  ): Promise<CardEntity> {
    return this.cardService.findOne(cardId, columnId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'title of card',
          example: 'news',
        },
        text: {
          type: 'string',
          description: 'text of card',
          example: 'test text',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'id',
          example: '42',
        },
        title: {
          type: 'string',
          description: 'title of card',
          example: 'news',
        },
        text: {
          type: 'string',
          description: 'text of card',
          example: 'test text',
        },
        author_: {
          type: 'object',
          description: 'user object',
          example: {
            id: 1,
            email: 'John@gmail.com',
            password:
              '$2b$10$.275k5seNCfHq1CE0EmPDOJkozr2QEJNFH8JSaYAdErmqN.MRXv9G',
            access_token: null,
          },
        },
      },
    },
  })
  async create(
    @Body() createCardDto: CreateCardDto,
    @Param('columnId') columnId: number,
    @UserDecorator() user: UserEntity,
  ): Promise<CardEntity> {
    return this.cardService.create(createCardDto, columnId, user);
  }

  @UseGuards(AuthGuard, cardAuthor)
  @ApiBearerAuth()
  @Patch(':cardId')
  @ApiOperation({ summary: 'Update a card' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'title of card',
          example: 'news',
        },
        text: {
          type: 'string',
          description: 'text of card',
          example: 'test text',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully updated.',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'id',
          example: '42',
        },
        title: {
          type: 'string',
          description: 'title of card',
          example: 'news',
        },
        text: {
          type: 'string',
          description: 'text of card',
          example: 'test text',
        },
      },
    },
  })
  async update(
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto,
    @Param('columnId') columnId: number,
  ): Promise<CardEntity> {
    return this.cardService.update(cardId, updateCardDto, columnId);
  }

  @UseGuards(AuthGuard, cardAuthor)
  @ApiBearerAuth()
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
