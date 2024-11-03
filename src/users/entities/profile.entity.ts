import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Posts } from "src/posts/entities/posts.entity";



@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    bio:string;

    @Column({nullable:true})
    name:string;

    @OneToMany(()=>Posts,(posts)=>posts.Profile)
    Post:Posts


    @OneToOne(()=>Users,(user)=>user.profile,{cascade:true,orphanedRowAction: 'delete' ,nullable:false})
    @JoinColumn({ name: "userId" })
    user:Users;

    // @OneToOne(() => Users, (user) => user.profile, { cascade: true, nullable: false })
    // @JoinColumn({ referencedColumnName: "email" }) // Explicitly specify to join on `email`
    // user: Users;
}