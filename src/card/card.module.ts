import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';
import { ColumnEntity } from '../column/entity/column.entity';
import { CardRepositoryService } from './card.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ColumnEntity])],
  providers: [CardService, CardRepositoryService],
  controllers: [CardController],
  exports: [CardService, CardRepositoryService],
})
export class CardModule {}
