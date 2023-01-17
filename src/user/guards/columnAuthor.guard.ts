import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../../column/entity/column.entity';

@Injectable()
export class columnAuthor implements CanActivate {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnEntityRepository: Repository<ColumnEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user.id;
    const id = request.params.id;

    const column = await this.columnEntityRepository.findOne({
      where: { id: id },
      relations: { author_: true },
    });

    if (!column) throw new NotFoundException('card not found');

    return userId === column.author_.id;
  }
}
