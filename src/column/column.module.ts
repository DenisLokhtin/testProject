import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entity/column.entity';
import { ColumnRepositoryService } from './column.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
  providers: [ColumnService, ColumnRepositoryService],
  controllers: [ColumnController],
  exports: [ColumnService, ColumnRepositoryService],
})
export class ColumnModule {}
