import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller("/postagens")
@ApiBearerAuth()
export class PostagemController{
    constructor(private readonly PostagemService: PostagemService){}

    //Puxa todos os dados da tabela
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{
        return this.PostagemService.findAll();
    }

    //Utiliza o ID para encontrar a linha
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id:number): Promise<Postagem>{
        return this.PostagemService.findById(id)
    }

    //Utiliza o Texto pra encontrar a linha
    @Get('/Texto/:texto')
    @HttpCode(HttpStatus.OK)
    findByTexto(@Param('texto') texto:string): Promise<Postagem[]>{
        return this.PostagemService.findByTexto(texto)
    }

    //Utiliza o titulo para encontrar a linha
    @Get('/Titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo')titulo:string): Promise<Postagem>{
        return this.PostagemService.findByTitulo(titulo)
    }

    //Incluir linha de informação 
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.PostagemService.create(postagem)
    }

    //Alteração na linha de informação
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.PostagemService.update(postagem)
    }

    //Deletar linha de informação por meio da PK "ID"
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.PostagemService.delete(id)
    }
}