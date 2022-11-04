import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsuarioModule } from "../usuario/usuario.module";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstants } from "./constants/constant";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./service/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '24h'}, //Horario sempre fechado, horario do usuario

        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy,JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt]
})
export class AuthModule { }