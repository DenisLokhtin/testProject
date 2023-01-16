import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardEntity } from '../../card/entity/card.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'columns' })
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.columns, { onDelete: 'CASCADE' })
  author_: UserEntity;

  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];
}
