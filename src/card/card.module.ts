import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [CardService],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
