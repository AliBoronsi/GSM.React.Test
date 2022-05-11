import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ schema: 'dbo', name: '_CarTypes' })
export class Unit {
    @ApiProperty() 
    @Column({ name: 'ct_Key' })
    @PrimaryColumn()
    ct_Key: number;

    @ApiProperty() 
    @Column({ name: 'Name' })
    name: string;

    @ApiProperty() 
    @Column({ name: 'CreatedOn' })
    createdOn: Date;
    
    @ApiProperty() 
    @Column({ name: 'UpdatedOn' })
    updatedOn: Date;
    
    @ApiProperty() 
    @Column({ name: 'CreatedBy' })
    createdBy: number;

    @ManyToOne(() => User, (user) => user.units)
    @JoinColumn({ name: 'createdBy' })
    user: User
}