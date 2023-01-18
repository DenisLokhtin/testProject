import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './entity/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CardEntity } from '../card/entity/card.entity';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class CommentRepositoryService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  async findAll(cardId: number) {
    return await this.commentRepository.find({
      where: { card: { id: cardId } },
    });
  }

  async findOneCard(cardId: number) {
    return await this.cardRepository.findOne({ where: { id: cardId } });
  }

  async create(
    cardId: number,
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ) {
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) throw new NotFoundException('card not found');
    return await this.commentRepository.save({
      text: createCommentDto.text,
      card: card,
      author_: {
        id: user.id,
        email: user.email,
      },
    });
  }

  async findOne(commentId: number, cardId: number) {
    return await this.commentRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
    });
  }

  async update(
    commentId: number,
    cardId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentRepository.update(
      { id: commentId, card: { id: cardId } },
      updateCommentDto,
    );
    return await this.commentRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
    });
  }

  async delete(commentId: number, cardId: number) {
    await this.commentRepository.delete({
      id: commentId,
      card: { id: cardId },
    });
    return { deleted: true };
  }
}
