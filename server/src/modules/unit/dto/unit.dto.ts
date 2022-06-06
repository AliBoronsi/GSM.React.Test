import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/shared/base-entity/base.dto";

export class UnitDto extends BaseDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    createdByName: string;
}