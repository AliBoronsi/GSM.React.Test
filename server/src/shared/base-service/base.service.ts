import { Injectable, Logger } from '@nestjs/common';
import { Brackets, Connection, DeepPartial, EntityTarget, InsertResult, Repository } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../base-entity/base.entity';

@Injectable()
export class BaseCrudService<T extends BaseEntity> {
  public repository: Repository<T>;
  private entityName: string;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  // https://stackoverflow.com/questions/54192483/typeorm-dynamic-query-builder-from-structured-object
  public getAll(): Promise<T[]> {
    const request = {
      columns: ['ct_Key', 'name'],
      // sortColumns: [],
      fastFilterKeyword: 'ماشین',
      fastFilterColumns: ['ct_Key', 'name'],
      startRow: 5,
      endRow: 11
    };


    this.entityName = this.repository.metadata.name;
    request.columns = request.columns.map(col => col = this.entityName + '.' + col);
    const query = this.repository.createQueryBuilder(this.entityName);
    query.select(request.columns);
    
    query.where(this.entityName + ".name = :name1", { name1: "1" });

    // request.fastFilterColumns.forEach(column => {
    //   query.orWhere(`${this.entityName}.${column} LIKE :${column}`, { [column]: '%' + request.fastFilterKeyword + '%' });
    // });
    query.andWhere(new Brackets(qb => {
      request.fastFilterColumns.map(column => 
        qb.orWhere(`${this.entityName}.${column} LIKE :${column}`, { [column]: '%' + request.fastFilterKeyword + '%' 
      }));
    }));

    // query.orderBy(request.columns[0],'DESC').addOrderBy(request.columns[1],'ASC');
    
    // query.skip(request.startRow - 1);
    // query.take(request.endRow - request.startRow + 1);

    Logger.log('', '\n' + query.getQueryAndParameters());
    return query.getMany();
  }

  public getAllWithRelations(relations?: string[]): Promise<T[]> {
    return this.repository.find({
      relations: relations
    });
  }

  public getById(id: number): Promise<T> {
    return this.repository.findOneOrFail(id);
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
