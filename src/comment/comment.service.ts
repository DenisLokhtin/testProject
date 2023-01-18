import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { UserEntity } from '../user/entity/user.entity';
import { CommentRepositoryService } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private commentRepositoryService: CommentRepositoryService) {}

  async findAll(cardId: number) {
    return await this.commentRepositoryService.findAll(cardId);
  }

  async create(
    cardId: number,
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ) {
    const card = await this.commentRepositoryService.findOneCard(cardId);
    if (!card) throw new NotFoundException('Card not found');
    return await this.commentRepositoryService.create(
      cardId,
      createCommentDto,
      user,
    );
  }

  async findOne(commentId: number, cardId: number) {
    return await this.commentRepositoryService.findOne(commentId, cardId);
  }

  async update(
    commentId: number,
    cardId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    let comment = await this.commentRepositoryService.findOne(
      commentId,
      cardId,
    );
    if (!comment) throw new NotFoundException('Comment not found');
    await this.commentRepositoryService.update(
      commentId,
      cardId,
      updateCommentDto,
    );
    return await this.commentRepositoryService.findOne(commentId, cardId);
  }

  async delete(commentId: number, cardId: number) {
    return await this.commentRepositoryService.delete(commentId, cardId);
  }
}
