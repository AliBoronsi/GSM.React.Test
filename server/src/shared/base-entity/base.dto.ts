import { ApiProperty } from "@nestjs/swagger";

export class BaseDto {
    @ApiProperty()
    ct_Key: number;

    @ApiProperty()
    createdOn: Date;

    @ApiProperty()
    updatedOn: Date;

    @ApiProperty()
    createdBy: number;
}