import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../../column/entity/column.entity';
import { CardEntity } from '../../card/entity/card.entity';
import { CommentEntity } from '../../comment/entity/comment.entity';

@Injectable()
export class commentAuthor implements CanActivate {
  constructor(
    @InjectRepository(CommentEntity)
    private commentEntityRepository: Repository<CommentEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;

    const column = await this.commentEntityRepository.findOne({
      where: { author_: userId },
    });

    return !!column;
  }
}
