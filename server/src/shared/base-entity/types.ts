import { SelectQueryBuilder } from "typeorm"

export type QueryBuilderDelegate<T> = (qb: SelectQueryBuilder<T>) => void;