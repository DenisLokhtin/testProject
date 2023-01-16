import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {hash} from "bcrypt";
import {ColumnEntity} from "../../column/entity/column.entity";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    password?: string;

    @OneToMany(() => ColumnEntity, (column) => column.author_)
    columns: ColumnEntity[];

    @Column({ nullable: true })
    access_token: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) this.password = await hash(this.password, 10);
    }
}
