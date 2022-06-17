import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UnitDto } from '../unit/dto/unit.dto';
import { Unit } from '../unit/unit.entity';
import { Todo, TodoDto } from './Todo';

let todos: Todo[] = [
  'NestJS',
  'GraphQL',
  'Apollo',
  'TypeScript',
  'React',
  'Redux',
  'React Query',
  'Angular',
  'Vue',
  'D3',
  'Svelte',
  'SolidJS',
  'NextJS',
  'AWS',
].map((text, index) => ({
  id: index + 1,
  text: `Learn ${text}`,
  active: true,
  done: false,
}));

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(@InjectMapper() private readonly mapper: Mapper) { }

  @Get()
  async index(): Promise<Todo[]> {
    return todos.filter(({ active }) => active);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<TodoDto> {
    const todo = todos.find((todo) => todo.id === parseInt(id));
    const dto = this.mapper.map(todo, Todo, TodoDto);
    return dto;
  }

  @Post()
  // async create(@Body() { text }: { text: string }): Promise<Todo> {
  async create(@Body() unit: UnitDto): Promise<Todo> {
    const todo = {
      id: todos.length + 1,
      // text,
      text: '',
      active: true,
      done: false,
    };
    todos.push(todo);
    return todo;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Todo): Promise<Todo> {
    todos = todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, ...data } : todo,
    );

    return data;
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<number> {
    todos = todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, active: false } : todo,
    );
    return parseInt(id);
  }
}
