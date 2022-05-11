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
    @Get()
    async index(): Promise<Unit[]> {
         return await [{ct_Key: 1, createdBy: 1, createdOn: new Date(), name: 'name',updatedOn: new Date()}];
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
