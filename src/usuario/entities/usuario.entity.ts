import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: "tb_usuario"})
    export class Usuario{
        @PrimaryGeneratedColumn()
        id:number

        @IsNotEmpty()
        @MaxLength(100)
        @Column({length: 100, nullable: false})
        nome:string

        @IsEmail()
        @Column({length: 255, nullable: false, unique:true})
        usuario:string //email

        
        @IsNotEmpty()
        @MinLength(6)
        @Column({length: 255, nullable: false})
        senha:string
        
        @MaxLength(5000)
        @Column({length: 5000, nullable: true})
        foto:string

        @OneToMany(() => Postagem, (postagem) => postagem.usuario)
        postagem: Postagem[]
    }