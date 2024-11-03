import { Injectable } from "@nestjs/common";
import { Posts } from "src/posts/entities/posts.entity";
import { Profile } from "src/users/entities/profile.entity";
import { Users } from "src/users/entities/users.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";



export const pgConfig:PostgresConnectionOptions={
    url:"postgresql://neondb_owner:X9xkyRvA8Fes@ep-fancy-meadow-a8o987bc.eastus2.azure.neon.tech/neondb?sslmode=require",
    type: 'postgres',
    //   entities: [
    //     __dirname + './**/*.entity{.ts,.js}',
    // ],
    entities: [Users, Profile,Posts],
      synchronize: true,   
      // logging:true 
}