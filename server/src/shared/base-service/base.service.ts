import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { UnitDto } from 'src/modules/unit/dto/unit.dto';
import { Unit } from 'src/modules/unit/unit.entity';
import { User } from 'src/modules/user/user.entity';
import { Brackets, Connection, DeepPartial, EntityTarget, getManager, InsertResult, Repository } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseDto } from '../base-entity/base.dto';
import { BaseEntity } from '../base-entity/base.entity';
import { QueryBuilderDelegate } from '../base-entity/types';
import { AgGridRequestModel, AgGridResponseItems } from '../models/AgGridViewModel';
import { GenericDefaultBuilder } from '../models/types';
import { Paginate } from './query.helper';

@Injectable()
export class BaseCrudService<T extends BaseEntity, TDto extends BaseDto> {
  public repository: Repository<T>;
  public dtoColumnSelector: GenericDefaultBuilder<TDto>;

  constructor(repository: Repository<T>/*, @InjectMapper() private mapper: Mapper*/) {
    this.repository = repository;
  }

  // https://stackoverflow.com/questions/54192483/typeorm-dynamic-query-builder-from-structured-object
  async getAll(
    request: AgGridRequestModel,
    qb?: QueryBuilderDelegate<T>,
  ): Promise<AgGridResponseItems<TDto>> {
    const innerSelectQuery = this.repository.createQueryBuilder('x');

    qb ? qb(innerSelectQuery) : null;

    // columns
    const columns =
      request.columns && request.columns.length
        ? request.columns
        : Object.keys(this.dtoColumnSelector());
    const columnsArray: string[] = [];
    columns.forEach((col) => {
      let existInCustomSelect = false;
      innerSelectQuery.expressionMap.selects.forEach((selcol) => {
        let currentSelectCols = selcol.selection?.toLowerCase().split(',');
        currentSelectCols.forEach((currentSelectCol) => {
          if (
            currentSelectCol.split(/\s/).includes(col.toLowerCase()) ||
            currentSelectCol.split(/\s/).includes(`[${col.toLowerCase()}]`)
          )
            existInCustomSelect = true;
        });
      });
      if (!existInCustomSelect) columnsArray.push(col);
    });
    const columnsExpression = columnsArray
      .map((col) => (col = 'x.' + col))
      .join(',');
    if (qb)
      // if has custom select we should ADD select
      innerSelectQuery.addSelect(columnsExpression);
    else innerSelectQuery.select(columnsExpression);


    const query = getManager().createQueryBuilder();

    // filterModel & extraFilter
    // AddFiltersToQueryBuilder<T>(query, {...request.filterModel, ...request.extraFilter}, entityName);

    // fastFilterKeyword & fastFilterColumns
    if (
      request.fastFilterKeyword &&
      request.fastFilterColumns &&
      request.fastFilterColumns.length
    ) {
      query.andWhere(
        new Brackets((qb) => {
          request.fastFilterColumns.map((column) =>
            qb.orWhere(`List.${column} LIKE :${column}`, {
              [column]: '%' + request.fastFilterKeyword + '%',
            }),
          );
        }),
      );
    }

    // sortModel
    if (request.sortModel && request.sortModel.length) {
      request.sortModel.forEach((item, index) => {
        if (index === 0)
          query.orderBy(
            `List.${item.colId}`,
            item.sort === 'asc' ? 'ASC' : 'DESC',
          );
        else
          query.addOrderBy(
            `List.${item.colId}`,
            item.sort === 'asc' ? 'ASC' : 'DESC',
          );
      });
    }

    query.select(columns.map((col) => (col = 'List.' + col)).join(',') + ',COUNT(1) OVER () totalRecord')
      .from("(" + innerSelectQuery.getQuery() + ")", 'List');
    Logger.log('getAll-wp', '\n' + query.getQueryAndParameters());

    // startRow & endRow
    Paginate(query, request.startRow, request.endRow);

    Logger.log('getAll', '\n' + query.getQueryAndParameters());

    const data = await query.getRawMany<TDto>();
    const totalCount = data?.at(0)?.totalRecord || 0;
    return {
      items: data,
      lastRow: totalCount,
    };
  }

  public getAllWithRelations(relations?: string[]): Promise<T[]> {
    return this.repository.find({
      relations: relations
    });
  }

  public async getById(id: number, queryBuilder?: QueryBuilderDelegate<T>): Promise<TDto> {
    const query = this.repository.createQueryBuilder('x');

    const entityColumns = this.repository.metadata.ownColumns.map(e => 'x.' + e.propertyName).join(',');
    query.select(entityColumns);

    queryBuilder.apply(this, [query]);
    query.andWhere("x.ct_Key = :ct_Key", { ct_Key: id });

    Logger.log('', '\n' + query.getQueryAndParameters());
    return await query.getRawOne<TDto>()//.getOne();
  }

  // https://stackoverflow.com/a/40821117/6350942
  // https://github.com/typeorm/typeorm/issues/2904
  public async insert(entity: TDto): Promise<T> {
    const result = await this.repository.save(entity as any);
    return result;
  }

  public async update(entity: DeepPartial<T>): Promise<T> {
    if (!entity.ct_Key || !(await this.repository.findOne(entity.ct_Key)))
      throw 'Entity Not Found';
    delete entity.createdOn;
    delete entity.updatedOn;
    const result = await this.repository.save(entity);
    return result;
  }

  public async delete(id: number): Promise<boolean> {
    if (!(await this.repository.findOne(id)))
      throw 'Entity Not Found';
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
