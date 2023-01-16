import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "./entity/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
