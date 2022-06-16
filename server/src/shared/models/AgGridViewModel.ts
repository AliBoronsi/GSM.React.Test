import { ApiProperty } from '@nestjs/swagger';

export class AgGridRequestModel {
  @ApiProperty() startRow: number | undefined;
  @ApiProperty() endRow: number | undefined;
  @ApiProperty() filterModel: { [key: string]: AgGridFilterModel } | null =
    null;
  @ApiProperty({ type: () => [SortModelItem] }) sortModel: SortModelItem[] = [];
  @ApiProperty() columns?: (string | undefined)[] = [];
  @ApiProperty() fastFilterColumns?: string[];
  @ApiProperty() fastFilterKeyword?: String;
  @ApiProperty() extraFilter?: { [key: string]: AgGridFilterModel } | null;
  @ApiProperty() paginationType: paginationTypeEnum;
}

export class AgGridFilterModel {
  @ApiProperty() filterType?: FilterModelFilterType;
  @ApiProperty() type?: FilterModelType;
  @ApiProperty() filter?: any;
  @ApiProperty() filterTo?: number;
  @ApiProperty() dateFrom?: string;
  @ApiProperty() dateTo?: string;
  @ApiProperty() operator?: FilterModelOperator;
  @ApiProperty() condition1?: AgGridFilterModel;
  @ApiProperty() condition2?: AgGridFilterModel;
}

export type FilterModelType =
  | 'equals'
  | 'notEqual'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'inRange'
  | 'null'
  | 'notNull';
export type RowSelectionType = 'single' | 'multiple' | undefined;

export type FilterModelFilterType = 'text' | 'number' | 'date' | 'boolean';

export type FilterModelOperator = 'AND' | 'OR';

export class SortModelItem {
  @ApiProperty() sort: 'asc' | 'desc';
  @ApiProperty() colId: string;
}

export enum paginationTypeEnum {
  loadMore,
  count,
}

export class AgGridResponseItems<T> {
  @ApiProperty() lastRow?: number;
  @ApiProperty() items?: T[];
}
export class AgGridResponseModel<T> {
  @ApiProperty() hasError: boolean;
  @ApiProperty() count?: number;
  @ApiProperty() statusCode: number;
  @ApiProperty() message: string;
  @ApiProperty({ type: () => AgGridResponseItems }) data: AgGridResponseItems<T>;

  static SuccessResult<T>(data: AgGridResponseItems<T>, message?: string): AgGridResponseModel<T> {
    return {
        hasError: false,
        count: data.items?.length,
        message: message,
        statusCode: 200,
        data: data,
    };
  }

  static FailResult<T>(
    message: string,
    statusCode?: number,
  ): AgGridResponseModel<T> {
    return {
      hasError: true,
      count: 0,
      message: message,
      statusCode: statusCode,
      data: null,
    };
  }
}
