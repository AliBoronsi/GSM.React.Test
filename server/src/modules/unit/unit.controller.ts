import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';

@Controller('unit')
export class UnitController {

    constructor() {
    }
    @Get()
    async index(): Promise<uniten[]> {
        return todos.filter(({ active }) => active);
    }

    @Get(':id')
    async show(@Param('id') id: string): Promise<Todo> {
        return todos.find((todo) => todo.id === parseInt(id));
    }

    @Post()
    async create(@Body() { text }: { text: string }): Promise<Todo> {
        const todo = {
            id: todos.length + 1,
            text,
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
