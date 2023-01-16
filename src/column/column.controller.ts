import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { ColumnService } from './column.service';
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
import { CreateColumnDto } from './dto/createColumn.dto';
import { UpdateColumnDto } from './dto/updateColumn.dto';
import { AuthGuard } from '../user/guards/user.guard';
import { UserDecorator } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { columnAuthor } from '../user/guards/columnAuthor.guard';

@ApiTags('columns')
@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Find all columns' })
  @ApiResponse({
    status: 200,
    description: 'Return all columns.',
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
            type: 'text',
            description: 'title of card',
            example: 'news',
          },
        },
      },
    },
  })
  async findAll() {
    return this.columnService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Find column by id' })
  @ApiResponse({
    status: 200,
    description: 'Return column by id.',
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
        cards: {
          type: 'array',
          description: 'array of cards objects',
          example: [],
        },
      },
    },
  })
  async findOne(@Param('id') id: number) {
    return this.columnService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({
    status: 201,
    description: 'The column has been successfully created.',
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
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'title of card',
          example: 'news',
        },
      },
    },
  })
  async create(
    @Body() column: CreateColumnDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.columnService.create(column, user);
  }

  @UseGuards(AuthGuard, columnAuthor)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update column' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'title of card',
          example: 'news',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The column has been successfully updated.',
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
      },
    },
  })
  async update(@Param('id') id: number, @Body() column: UpdateColumnDto) {
    return this.columnService.update(id, column);
  }

  @UseGuards(AuthGuard, columnAuthor)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 200, description: 'The column has been deleted.' })
  async remove(@Param('id') id: number) {
    return this.columnService.remove(id);
  }
}
