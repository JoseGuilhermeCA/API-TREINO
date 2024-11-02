import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Exercicio } from './exercicio/entities/exercicio.entity';
import { ExercicioModule } from './exercicio/exercicio.module';
import { ExerciciosTreino } from './treino/entities/exercicios-treino.entity';
import { Treino } from './treino/entities/treino.entity';
import { TreinoModule } from './treino/treino.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Usuario, Treino, Exercicio, ExerciciosTreino],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario, Treino, Exercicio, ExerciciosTreino]),
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ), AuthModule, UsuarioModule, TreinoModule, ExercicioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
