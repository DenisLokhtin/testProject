import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { CardEntity } from '../card/entity/card.entity';
import { CommentRepositoryService } from './comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CardEntity])],
  providers: [CommentService, CommentRepositoryService],
  controllers: [CommentController],
  exports: [CommentService, CommentRepositoryService],
})
export class CommentModule {}
