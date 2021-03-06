import { Body, Controller, Delete, Get, Param, Post, Put, Type } from '@nestjs/common';
import { ApiBody, ApiExcludeController, ApiExcludeEndpoint } from '@nestjs/swagger';
import { BaseEntity } from '../base-entity/base.entity';
import { DeepPartial, InsertResult } from 'typeorm';
import { BaseCrudService } from '../base-service/base.service';
import { ServerResult } from '../base-entity/server-result';

@Controller('base-controller')
export class baseCrudController<T extends BaseEntity> {
    constructor(private baseCrudService: BaseCrudService<T>) {
    }

    @Get("getAll")
    public async getAll(): Promise<ServerResult<T[]>> {
        try {
            const res = await this.baseCrudService.getAll();
            return ServerResult.SuccessResult(res);
        } catch (error) {
            return ServerResult.FailResult(error);
        }
    }

    @Get("getById/:id")
    public async getById(@Param('id') id: number): Promise<ServerResult<T>> {
        try {
            const res = await this.baseCrudService.getById(id);
            return ServerResult.SuccessResult(res);
        } catch (error) {
            return ServerResult.FailResult(error);
        }
    }

    @Post("insert")
    public async insert(@Body() entity: DeepPartial<T>): Promise<ServerResult<T>> {
        try {
            const res = await this.baseCrudService.insert(entity);
            return ServerResult.SuccessResult(res, 'Inserted Successfully');
        } catch (error) {
            return ServerResult.FailResult(error);
        }
    }

    @Put("update")
    public async update(@Body() entity: DeepPartial<T>): Promise<ServerResult<T>> {
        try {
            const res = await this.baseCrudService.update(entity);
            return ServerResult.SuccessResult(res, 'Updated Successfully');
        } catch (error) {
            return ServerResult.FailResult(error);
        }
    }

    @Delete("delete/:id")
    public async delete(@Param('id') id: number): Promise<ServerResult<boolean>> {
        try {
            const res = await this.baseCrudService.delete(id);
            return ServerResult.SuccessResult(res, 'Deleted Successfully');
        } catch (error) {
            return ServerResult.FailResult(error);
        }
    }
}
