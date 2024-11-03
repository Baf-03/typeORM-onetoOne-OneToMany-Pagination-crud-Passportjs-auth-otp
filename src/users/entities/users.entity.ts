import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";



@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({default:false})
    verified:boolean;

    @OneToOne(()=>Profile,(profile)=>profile.user)
    profile:Profile;
}