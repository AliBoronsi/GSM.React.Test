import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { UnitDto } from 'src/modules/unit/dto/unit.dto';
import { Unit } from 'src/modules/unit/unit.entity';
import { User } from 'src/modules/user/user.entity';
import { Brackets, Connection, DeepPartial, EntityTarget, InsertResult, Repository } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseDto } from '../base-entity/base.dto';
import { BaseEntity } from '../base-entity/base.entity';
import { QueryBuilderDelegate } from '../base-entity/types';

@Injectable()
export class BaseCrudService<T extends BaseEntity, TDto extends BaseDto> {
  public repository: Repository<T>;
  private entityAlias: string;

  constructor(repository: Repository<T>/*, @InjectMapper() private mapper: Mapper*/) {
    this.repository = repository;
  }

  // https://stackoverflow.com/questions/54192483/typeorm-dynamic-query-builder-from-structured-object
  public getAll(queryBuilder?: QueryBuilderDelegate<T>): Promise<TDto[]> {
    const request = {
      columns: ['ct_Key', 'name'],
      // sortColumns: [],
      fastFilterKeyword: 'ماشین',
      fastFilterColumns: ['ct_Key', 'name'],
      startRow: 5,
      endRow: 11
    };


    this.entityAlias = 'X';//this.repository.metadata.name;
    const columns = request.columns && request.columns.length ?
      request.columns.map(col => col = this.entityAlias + '.' + col).join(',') :
      this.repository.metadata.ownColumns.map(e => this.entityAlias + '.' + e.propertyName).join(',')
    const query = this.repository.createQueryBuilder(this.entityAlias);
    query.select(columns);

    queryBuilder.apply(this, [query]);

    // query.where(this.entityName + ".name = :name1", { name1: "1" });

    query.andWhere(new Brackets(qb => {
      request.fastFilterColumns.map(column =>
        qb.orWhere(`${this.entityAlias}.${column} LIKE :${column}`, {
          [column]: '%' + request.fastFilterKeyword + '%'
        }));
    }));

    // query.orderBy(request.columns[0],'DESC').addOrderBy(request.columns[1],'ASC');

    // query.skip(request.startRow - 1);
    // query.take(request.endRow - request.startRow + 1);

    Logger.log('', '\n' + query.getQueryAndParameters());
    return query.getRawMany<TDto>();
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

  public async insert(entity: DeepPartial<T>): Promise<T> {
    const result = await this.repository.save(entity);
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
