import { Repository, SelectQueryBuilder } from 'typeorm';
import { AgGridFilterModel } from '../models/AgGridViewModel';

export function AddFiltersToQueryBuilder<T>(
  query: SelectQueryBuilder<T>,
  filterObject: {
    [key: string]: AgGridFilterModel;
  },
  entityAlias: string,
) {
  for (const [column, filter] of Object.entries(filterObject)) {
    switch (filter.type) {
      case 'equals':
        switch (filter.filterType) {
          case 'text':
            query.andWhere(`${entityAlias}.${column} = :${column}`, {
              [column]: filter.filter as string,
            });
            break;
          case 'number':
            query.andWhere(`${entityAlias}.${column} = :${column}`, {
              [column]: filter.filter as number,
            });
            break;
          case 'date':
            query.andWhere(
              //   `${entityAlias}.${column} = CAST(:${column} as DATETIME)`,
              `${entityAlias}.${column} = :${column}`,
              {
                [column]: filter.dateFrom,
              },
            ); //tot
            break;
          case 'boolean':
            query.andWhere(`${entityAlias}.${column} = :${column}`, {
              [column]: (filter.filter as boolean) ? 1 : 0,
            }); //tot
            break;
          default:
            break;
        }
        break;

      case 'notEqual':
        switch (filter.filterType) {
          case 'text':
            query.andWhere(`${entityAlias}.${column} <> :${column}`, {
              [column]: filter.filter as string,
            });
            break;
          case 'number':
            query.andWhere(`${entityAlias}.${column} <> :${column}`, {
              [column]: filter.filter as number,
            });
            break;
          case 'date':
            query.andWhere(
              `${entityAlias}.${column} <> :CAST(:${column} as DATETIME)`,
              {
                [column]: filter.dateFrom,
              },
            ); //tot
            break;
          case 'boolean':
            query.andWhere(`${entityAlias}.${column} <> :${column}`, {
              [column]: (filter.filter as boolean) ? 1 : 0,
            }); //tot
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
}

export function Paginate<T>(
  query: SelectQueryBuilder<T>,
  startRow?: number,
  endRow?: number,
) {
  if (startRow) query.offset(startRow);
  if (endRow) query.limit(endRow - (startRow ? startRow : 0));
}

export function getAllEntityColumns<T>(repository: Repository<T>): string[] {
  return repository.metadata.ownColumns.map(
    (e) => e.propertyName,
  );
}

function _byColumnType() {}
