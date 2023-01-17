import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
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

    const userId = request.user.id;
    const id = request.params.id;

    const comment = await this.commentEntityRepository.findOne({
      where: { id: id },
      relations: { author_: true },
    });

    if (!comment) throw new NotFoundException('card not found');

    return userId === comment.author_.id;
  }
}
