import { ArgumentMetadata, Body, Controller, Delete, Get, Injectable, Param, Post, Put, Type, UsePipes, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ApiBody, ApiExcludeController, ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';
import { BaseEntity } from '../base-entity/base.entity';
import { DeepPartial, InsertResult } from 'typeorm';
import { BaseCrudService } from '../base-service/base.service';
import { ServerResult } from '../base-entity/server-result';
import { BaseDto } from '../base-entity/base.dto';
import { AgGridRequestModel, AgGridResponseModel } from '../models/AgGridViewModel';

// https://stackoverflow.com/questions/55818694/usepipesvalidationpipe-not-working-with-generics-abstract-controller


export type ClassType<T> = new (...args: any[]) => T;
export interface IController<T extends BaseEntity, TDto extends BaseDto> {
    getAll(input: AgGridRequestModel): Promise<AgGridResponseModel<TDto>>;
    getById(id: number): Promise<ServerResult<TDto>>;
    insert(entity: TDto): Promise<ServerResult<T>>;
    update(entity: DeepPartial<T>): Promise<ServerResult<T>>;
    delete(id: number): Promise<ServerResult<boolean>>;
}



@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    options: ValidationPipeOptions,
    private readonly targetTypes: {
      body?: Type<any>;
      query?: Type<any>;
      param?: Type<any>;
      custom?: Type<any>;
    },
  ) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type];
    if (!targetType) {
      return super.transform(value, metadata);
    }
    return super.transform(value, { ...metadata, metatype: targetType });
  }
}



export function Factory<T extends BaseEntity, TDto extends BaseDto>(Dto: ClassType<TDto>): ClassType<IController<T, TDto>> {
    @Controller('base-controller')
    class baseCrudController<T extends BaseEntity, TDto extends BaseDto> implements IController<T, TDto> {
        constructor(private baseCrudService: BaseCrudService<T, TDto>) {
        }

        @ApiOkResponse({
            type: AgGridResponseModel,
        })
        @Post('getAll')
        public async getAll(
            @Body() input: AgGridRequestModel,
        ): Promise<AgGridResponseModel<TDto>> {
            try {
                const res = await this.baseCrudService.getAll(input);
                return AgGridResponseModel.SuccessResult(res);
            } catch (error) {
                return AgGridResponseModel.FailResult(error.message);
            }
        }

        @Get("getById/:id")
        public async getById(@Param('id') id: number): Promise<ServerResult<TDto>> {
            try {
                const res = await this.baseCrudService.getById(id);
                return ServerResult.SuccessResult(res);
            } catch (error) {
                return ServerResult.FailResult(error);
            }
        }

        @Post("insert")
        @UsePipes(new AbstractValidationPipe({whitelist: true, transform: true}, {body: Dto}))
        @ApiBody({type: Dto})
        // https://github.com/nestjs/swagger/issues/86
        public async insert(@Body() entity: TDto): Promise<ServerResult<T>> {
            try {
                const res = await this.baseCrudService.insert(entity);
                return ServerResult.SuccessResult(res);
            } catch (error) {
                return ServerResult.FailResult(error);
            }
        }

        @Put("update")
        public async update(@Body() entity: DeepPartial<T>): Promise<ServerResult<T>> {
            try {
                const res = await this.baseCrudService.update(entity);
                return ServerResult.SuccessResult(res);
            } catch (error) {
                return ServerResult.FailResult(error);
            }
        }

        @Delete("delete/:id")
        public async delete(@Param('id') id: number): Promise<ServerResult<boolean>> {
            try {
                const res = await this.baseCrudService.delete(id);
                return ServerResult.SuccessResult(res);
            } catch (error) {
                return ServerResult.FailResult(error);
            }
        }
    }
    
    return baseCrudController;
}
