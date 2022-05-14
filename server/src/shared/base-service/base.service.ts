import { Injectable } from '@nestjs/common';
import { Connection, DeepPartial, EntityTarget, InsertResult, Repository } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../base-entity/base.entity';

@Injectable()
export class BaseCrudService<T extends BaseEntity> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public getAll(): Promise<T[]> {
    return this.repository.find();
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

  public async delete(id: number) : Promise<boolean> {
    if (!(await this.repository.findOne(id)))
      throw 'Entity Not Found';
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
