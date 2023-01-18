import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { UserEntity } from '../../user/entity/user.entity';
import { ColumnEntity } from '../../column/entity/column.entity';
import { CommentEntity } from '../../comment/entity/comment.entity';

@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  test: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: ColumnEntity;

  @ManyToOne(() => UserEntity, (user) => user.cards, { onDelete: 'CASCADE' })
  author_: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comment: CommentEntity[];
}
