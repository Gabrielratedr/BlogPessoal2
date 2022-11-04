import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

Injectable()
export class Bcrypt{
//Criamos uma hash aleatória com saltos 10
    async criptografarSenha(senha: string): Promise<string>{
        let saltos: number = 10
        return await bcrypt.hash(senha, saltos);
    }

//Comparar senha Digitada e senhaBanco
    async compararSenha(senhaBanco: string, senhaDigitada: string): Promise<boolean>{
        return bcrypt.compareSync(senhaDigitada, senhaBanco);
    }
}