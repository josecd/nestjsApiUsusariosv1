/* eslint-disable prettier/prettier */
import { Entity,Column,PrimaryGeneratedColumn,ManyToOne} from "typeorm";
import { User } from "src/users/user.entity";

@Entity({name:'publicaciones'})
export class Posts {
    @PrimaryGeneratedColumn() 
    id: number
    @Column() 
    title: string
    @Column()
    content: string
    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'}) 
    createAt: Date
    @Column({nullable:true}) /*nullable sirve para poder decir que puede ser null */
    authorId: number
    @ManyToOne(()=>User,user=>user.posts)
    author:User
}
