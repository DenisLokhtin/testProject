import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
    const userId = request.params.userId;

    const column = await this.columnEntityRepository.findOne({
      where: { author_: userId },
    });

    return !!column;
  }
}
