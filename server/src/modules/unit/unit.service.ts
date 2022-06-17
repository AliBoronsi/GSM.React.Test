import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilderDelegate } from 'src/shared/base-entity/types';
import { BaseCrudService } from 'src/shared/base-service/base.service';
import { AgGridRequestModel, AgGridResponseItems } from 'src/shared/models/AgGridViewModel';
import { Connection, EntityTarget, getManager, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../user/user.entity';
import { UnitDto } from './dto/unit.dto';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService extends BaseCrudService<Unit, UnitDto> {
  constructor(
    @InjectRepository(Unit) public repository: Repository<Unit>,
  ) {
    super(repository);
    this.dtoColumnSelector = () => {
      return {
        name: null,
        createdByName: null,
        ct_Key: null,
        createdOn: null,
        updatedOn: null,
        createdBy: null
      };
    };
  }

  queryBuilderDelegate: QueryBuilderDelegate<Unit> = qb => {
    qb.innerJoin(User, 'u', 'u.u_Key = x.createdBy')
      // .select('x.ct_Key,x.createdOn,x.updatedOn,x.createdBy,x.name')
      .select(`u.u_FirstName + ' ' + u.u_LastName as createdByName`);
  };

  override async getAll(
    request: AgGridRequestModel,
  ): Promise<AgGridResponseItems<UnitDto>> {
    return super.getAll(request, this.queryBuilderDelegate);
  }

  override async getById<T>(id: number, a: T): Promise<UnitDto> {

    // const nestedQuery = this.repository.createQueryBuilder('n');
    // nestedQuery.select('n.ct_Key', 'n');
    // nestedQuery.where('n.ct_Key >= 30');
    // // nestedQuery.where('n.ct_Key >= :ct_Key');
    // nestedQuery.setParameter("ct_Key", 30);

    // Logger.log(nestedQuery.getQuery());

    // const query = getManager().createQueryBuilder();
    // query.select('list.ct_Key')
    //   .from("(" + nestedQuery.getQuery() + ")", 'list');

    // Logger.log(query.getQuery());

    // const data = await query.getRawMany<Unit>();
    
    // this.repository.save(a);
    
    // return new UnitDto();

    return super.getById(id,this.queryBuilderDelegate);
  }
}
