import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/shared/base-entity/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ schema: 'dbo', name: '_CarTypes' })
export class Unit extends BaseEntity{
    @ApiProperty() 
    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.units)
    @JoinColumn({ name: 'createdBy' })
    user: User
}