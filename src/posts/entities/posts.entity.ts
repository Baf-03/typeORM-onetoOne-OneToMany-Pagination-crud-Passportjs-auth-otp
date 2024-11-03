import { Profile } from "src/users/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(()=>Profile,(profile)=>profile.Post)
    Profile:Profile
}