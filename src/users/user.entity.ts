/* eslint-disable prettier/prettier */
import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuarios'})/*de esta forma puedes cambiar el nombre para generar en la tabla de mysql*/
export class User {
    @PrimaryGeneratedColumn() /* PrimaryGeneratedColumn Es para que se genere solo el id */
    id: number
    @Column({unique:true}) /*unique sirve para decir que el nombre va ser unico */
    username: string
    @Column()/* EL colum sirve para saber que esto es una columna de una tabla */
    password: string
    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'}) /*type es para indicar de que tipo es la fechar*/
    createAt: Date
    @Column({nullable:true}) /*nullable sirve para poder decir que puede ser null */
    authStrategy: string
}
