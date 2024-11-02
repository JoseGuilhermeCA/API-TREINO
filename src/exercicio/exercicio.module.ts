import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercicio } from './entities/exercicio.entity';
import { ExercicioController } from './exercicio.controller';
import { ExercicioService } from './exercicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercicio])],
  controllers: [ExercicioController],
  providers: [ExercicioService],
})
export class ExercicioModule { }
