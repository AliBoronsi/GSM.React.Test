import { ApiProperty } from "@nestjs/swagger";

export class DeleteInputDto {
    @ApiProperty()
    id: number;
}