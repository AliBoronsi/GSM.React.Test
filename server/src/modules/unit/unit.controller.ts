import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { baseCrudController } from 'src/shared/base-controller/base.controller';
import { UnitDto } from './dto/unit.dto';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';

@Controller('Unit')
@ApiTags('Unit')
export class UnitController extends baseCrudController<Unit,UnitDto> {

    constructor(private unitService: UnitService) {
        super(unitService);
    }
    
    // @Get('getAllWithRelations')
    // async getAllWithRelations(): Promise<Unit[]> {
    //     return this.unitService.getAllWithRelations(['user']);
    // }
}
