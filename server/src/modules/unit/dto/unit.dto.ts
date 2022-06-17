import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { BaseDto } from "src/shared/base-entity/base.dto";

export class UnitDto extends BaseDto {
    @ApiProperty()
    @IsEmail({},{message:'ایمیل بفرست داش'})
    name: string;

    @ApiProperty()
    createdByName: string;
}