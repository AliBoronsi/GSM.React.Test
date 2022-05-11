import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from 'src/shared/base-service/base.service';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService extends BaseCrudService<Unit> {
  constructor(
    @InjectRepository(Unit) public repository: Repository<Unit>,
  ) {
    super(repository);
    // getById(id: number): Promise<TEntity>;
    // create(entity: DeepPartial<TEntity>): Promise<TEntity>;
    // update(id: number, entity: QueryDeepPartialEntity<TEntity>): Promise<TEntity>;
    // delete(id: number): Promise<boolean>;
  }
}
