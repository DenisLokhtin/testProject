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
import { CardEntity } from '../../card/entity/card.entity';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => ColumnEntity, (column) => column.author_, {
    onDelete: 'CASCADE',
  })
  author_: ColumnEntity;

  @ManyToOne(() => CardEntity, (card) => card.comment, { onDelete: 'CASCADE' })
  card: CardEntity;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
