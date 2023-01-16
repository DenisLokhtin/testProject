import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';
import { CardModule } from './card/card.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './user/middleware/auth.middleware';

@Module({
  imports: [
    UserModule,
    ColumnModule,
    CommentModule,
    CardModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/(.*)', method: RequestMethod.ALL },
        { path: '/user/register', method: RequestMethod.ALL },
        { path: '/user/login', method: RequestMethod.ALL },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
