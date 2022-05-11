import { Injectable } from '@nestjs/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import ormconfig from '../../../ormconfig.json';

@Injectable()
export class BaseCrudService<T> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public getAll(): Promise<T[]>{
    return this.repository.find();
  }
}
