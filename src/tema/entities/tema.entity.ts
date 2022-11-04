import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: "tb_temas"})
    export class Tema{
        
        @PrimaryGeneratedColumn()
        @ApiProperty()
        id: number

        @IsNotEmpty()
        @MaxLength(250)
        @Column({length:250, nullable: false})
        @ApiProperty()
        descricao: string

        @ApiProperty({ type: () => Postagem })
        @OneToMany(() => Postagem, (Postagem) => Postagem.tema)
        postagem: Postagem[]
    }