import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, Generated } from "typeorm";

export class BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn("identity")
    @Generated("increment")
    ct_Key: number;

    @ApiProperty()
    @CreateDateColumn({ type: "datetime", default: () => 'CURRENT_TIMESTAMP'})
    createdOn: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "datetime", default: () => 'CURRENT_TIMESTAMP'})
    updatedOn: Date;

    @ApiProperty()
    @Column()
    createdBy: number;
}