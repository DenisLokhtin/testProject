import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../../column/entity/column.entity';
import { CardEntity } from '../../card/entity/card.entity';

@Injectable()
export class cardAuthor implements CanActivate {
  constructor(
    @InjectRepository(CardEntity)
    private cardEntityRepository: Repository<CardEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;

    const column = await this.cardEntityRepository.findOne({
      where: { author_: userId },
    });

    return !!column;
  }
}
