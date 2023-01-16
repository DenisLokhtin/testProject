import { Injectable } from '@nestjs/common';
import { CommentEntity } from './entity/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CardEntity } from '../card/entity/card.entity';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class CommentService {
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

  async create(
    cardId: number,
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ) {
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      card,
      author_: user,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async findOne(id: number, cardId: number) {
    return await this.commentRepository.findOne({
      where: { id: id, card: { id: cardId } },
    });
  }

  async update(id: number, cardId: number, updateCommentDto: UpdateCommentDto) {
    let comment = await this.commentRepository.findOne({
      where: { id: id, card: { id: cardId } },
    });
    await this.commentRepository.update(
      { id: id, card: { id: cardId } },
      updateCommentDto,
    );
    comment = await this.commentRepository.findOne({
      where: { id: id, card: { id: cardId } },
    });
    return comment;
  }

  async delete(id: number, cardId: number) {
    await this.commentRepository.delete({ id: id, card: { id: cardId } });
    return { deleted: true };
  }
}
