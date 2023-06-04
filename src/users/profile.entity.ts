/* eslint-disable prettier/prettier */
import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuario_perfil'})
export class Profile {
    @PrimaryGeneratedColumn() 
    id: number
    @Column() 
    firstname: string
    @Column()
    lastanme: string
    @Column() 
    age: number
    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'}) 
    createAt: Date

}
