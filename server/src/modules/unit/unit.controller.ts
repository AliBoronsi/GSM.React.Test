import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { baseCrudController } from 'src/shared/base-controller/base.controller';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';

@Controller('unit')
@ApiTags()
export class UnitController extends baseCrudController<Unit> {

    constructor(private unitService: UnitService) {
        super(unitService);
    }
    // @Get()
    // async getAll(): Promise<Unit[]> {
    //     return this.unitService.getAll();
    // }
    @Get('getAllWithRelations')
    async getAllWithRelations(): Promise<Unit[]> {
        return this.unitService.getAllWithRelations(['user']);
        //  return this.unitService.repository.find({
        //      relations:['user']
        // });
    }
    // @Get(':id')
    // async show(@Param('id') id: string): Promise<Unit> {
    // }

    // @Post()
    // async create(@Body() { text }: { text: string }): Promise<Unit> {
        
    // }

    // @Put(':id')
    // async update(@Param('id') id: string, @Body() data: Unit): Promise<Unit> {
        
    // }

    // @Delete(':id')
    // @HttpCode(204)
    // async destroy(@Param('id') id: string): Promise<number> {
        
    // }
}
