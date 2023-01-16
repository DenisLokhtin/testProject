import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {ColumnModule} from './column/column.module';
import {CommentModule} from './comment/comment.module';
import {CardModule} from './card/card.module';
import {ConfigModule} from "@nestjs/config";
import {dataSourceOptions} from "../db/data-source";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    imports: [
        UserModule,
        ColumnModule,
        CommentModule,
        CardModule, ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
