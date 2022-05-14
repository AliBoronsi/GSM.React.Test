import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { baseCrudController } from 'src/shared/base-controller/base.controller';
import { ServerResult } from 'src/shared/base-entity/server-result';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';

@Controller('Unit')
@ApiTags('Unit')
export class UnitController extends baseCrudController<Unit> {

    constructor(private unitService: UnitService) {
        super(unitService);
    }
    
    @Get('getAllWithRelations')
    async getAllWithRelations(): Promise<ServerResult<Unit[]>> {
        try {
            const res = await this.unitService.getAllWithRelations(['user']);
            return ServerResult.SuccessResult(res);
        } catch (error) {
            return ServerResult.FailResult(error);
        }
    }
}
