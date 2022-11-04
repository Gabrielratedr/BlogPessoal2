import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Teste de Módulos Usuarios e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'db_blogpessoal_test',
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        dropSchema: true
      }),
      
      AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close()

  });

  it ('01 - Deve cadastrar Usuario', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome:'Cleitinho',
      usuario: 'teste@gmail.com',
      senha: 'teste123',
      foto: ''
    });
    expect(201)
    usuarioId = resposta.body.id

  })

  it ('02 - Deve autenticar Usuario (login)', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/auth/logar')
    .send({
      usuario: 'teste@gmail.com',
      senha: 'teste123',
    });
    expect(200)

    token = resposta.body.token

  })
  

  it ('03 - Não Deve Duplicar o Usuario', async () => {
    return request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome:'Cleitinho',
      usuario: 'teste@gmail.com',
      senha: 'teste123',
      foto: ''

    })
    .expect(400)

  })

  it('04 - Deve listar todos os Usuarios', async () => {
    return request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)

  })

  it('05 - Atualizar um Usuario', async () => {
    return request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome:'Jorginho',
      usuario: 'teste@gmail.com',
      senha: 'teste123',
      foto: ''
    })
    .expect(200)
    .then(
      resposta => {
        expect("Jorginho").toEqual(resposta.body.nome)
      }
    )
  })
});
