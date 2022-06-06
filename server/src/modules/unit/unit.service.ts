import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilderDelegate } from 'src/shared/base-entity/types';
import { BaseCrudService } from 'src/shared/base-service/base.service';
import { Connection, EntityTarget, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../user/user.entity';
import { UnitDto } from './dto/unit.dto';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService extends BaseCrudService<Unit, UnitDto> {
  constructor(
    @InjectRepository(Unit) public repository: Repository<Unit>,
  ) {
    super(repository);
  }

  queryBuilderDelegate: QueryBuilderDelegate<Unit> = qb => {
    qb.innerJoin(User, 'u', 'u.u_Key = x.createdBy')
      // .select('x.ct_Key,x.createdOn,x.updatedOn,x.createdBy,x.name')
      .addSelect(`u.u_FirstName + ' ' + u.u_LastName as createdByName`);
  };
  
  override async getAll(): Promise<UnitDto[]> {
    return super.getAll(this.queryBuilderDelegate);
  }

  override async getById(id: number): Promise<UnitDto> {
    return super.getById(id,this.queryBuilderDelegate);
  }
}
