import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class BaseDto {
    @ApiProperty()
    ct_Key: number;

    @ApiProperty()
    createdOn: Date;

    @ApiProperty()
    updatedOn: Date;

    @ApiProperty()
    createdBy: number;

    @Exclude()
    totalRecord: number;
}