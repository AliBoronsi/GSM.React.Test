import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Unit } from "../unit/unit.entity";

@Entity({ schema: 'dbo', name: '_Users' })
export class User {
    @ApiProperty() 
    @Column({ name: 'u_Key' })
    @PrimaryColumn()
    u_Key: number;

    @ApiProperty() 
    @Column({ name: 'u_FirstName' })
    u_FirstName: string;
    
    @ApiProperty() 
    @Column({ name: 'u_LastName' })
    u_LastName: string;

    @OneToMany(() => Unit, (unit) => unit.user)
    units: Unit[]
}