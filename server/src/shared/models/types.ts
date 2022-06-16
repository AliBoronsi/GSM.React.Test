import { SelectQueryBuilder } from "typeorm"
import { ValidationType } from "./enums";

export type QueryBuilderDelegate<T> = (qb: SelectQueryBuilder<T>) => void;

export type GenericDefaultBuilder<T> = () => Partial<T>;

export type CreateUpdateDeleteValidator<T> = (type: ValidationType, entity?: Partial<T>) => void;

export type ObjectType<T> = { new (): T } | Function;