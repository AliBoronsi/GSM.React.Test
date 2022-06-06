import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';

import { TodosModule } from './modules/todos/todo.module';
import { UnitModule } from './modules/unit/unit.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { classes } from '@automapper/classes';
import { TodoProfile } from './modules/todos/todo.profile';

@Module({
  imports: [TypeOrmModule.forRoot(),
  AutomapperModule.forRoot({
    strategyInitializer: classes(),
  }),
    TodosModule, SharedModule, UnitModule, UserModule],
  providers: [TodoProfile]
})
export class AppModule { }
