import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../user/guards/user.guard';
import { UserDecorator } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { commentAuthor } from '../user/guards/commentAuthor.guard';

@ApiTags('comments')
@Controller('cards/:cardId/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: 'Show all comments for a card' })
  @ApiResponse({
    status: 200,
    description: 'Return all comments',
    schema: {
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'id',
            example: '42',
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Param('cardId') cardId: number) {
    return this.commentService.findAll(cardId);
  }

  @ApiOperation({ summary: 'Create a new comment for a card' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
    description: 'Return new comment',
    schema: {
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'id',
            example: '42',
          },
          text: {
            type: 'string',
            description: 'text of card',
            example: 'test text',
          },
          created_at: {
            type: 'string',
            description: 'date of create',
            example: '2023-01-16T18:40:14.413Z',
          },
          author: {
            type: 'object',
            description: 'user',
            example: {
              id: 1,
            },
          },
          card: {
            type: 'object',
            description: 'card',
            example: {
              id: 3,
              title: 'news',
              text: 'test text',
            },
          },
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  createComment(
    @Param('cardId') cardId: number,
    @Body() data: CreateCommentDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.commentService.create(cardId, data, user);
  }

  @ApiOperation({ summary: 'Find one comment by id' })
  @ApiResponse({
    status: 200,
    description: 'Return comment',
    schema: {
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'id',
            example: '42',
          },
          text: {
            type: 'string',
            description: 'text of card',
            example: 'test text',
          },
          created_at: {
            type: 'string',
            description: 'date of create',
            example: '2023-01-16T18:40:14.413Z',
          },
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number, @Param('cardId') cardId: number) {
    return this.commentService.findOne(id, cardId);
  }

  @ApiOperation({ summary: 'Update a comment by id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
    description: 'Return comment',
    schema: {
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'id',
            example: '42',
          },
          text: {
            type: 'string',
            description: 'text of card',
            example: 'test text',
          },
          created_at: {
            type: 'string',
            description: 'date of create',
            example: '2023-01-16T18:40:14.413Z',
          },
        },
      },
    },
  })
  @UseGuards(AuthGuard, commentAuthor)
  @ApiBearerAuth()
  @Patch(':id')
  updateComment(
    @Param('id') id: number,
    @Param('cardId') cardId: number,
    @Body() data: UpdateCommentDto,
  ) {
    return this.commentService.update(id, cardId, data);
  }

  @ApiOperation({ summary: 'Delete a comment by id' })
  @UseGuards(AuthGuard, commentAuthor)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number, @Param('cardId') cardId: number) {
    return this.commentService.delete(id, cardId);
  }
}
