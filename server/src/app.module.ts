import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './modules/todos/todo.module';
import { UnitModule } from './modules/unit/unit.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [TypeOrmModule.forRoot(),TodosModule, SharedModule, UnitModule],
})
export class AppModule {}
