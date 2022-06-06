import { Module } from '@nestjs/common';

import { TodosController } from './todo.controller';
import { TodoProfile } from './todo.profile';

@Module({
  controllers: [TodosController],
  providers: []
})
export class TodosModule {}
