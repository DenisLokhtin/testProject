import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from '../../card/entity/card.entity';

@Injectable()
export class cardAuthor implements CanActivate {
  constructor(
    @InjectRepository(CardEntity)
    private cardEntityRepository: Repository<CardEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user.id;
    const cardId = request.params.cardId;

    const card = await this.cardEntityRepository.findOne({
      where: { id: cardId },
      relations: { author_: true },
    });

    if (!card) throw new NotFoundException('card not found');

    return userId === card.author_.id;
  }
}
