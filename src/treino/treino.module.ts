import { Module } from '@nestjs/common';
import { TreinoService } from './treino.service';
import { TreinoController } from './treino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treino } from './entities/treino.entity';
import { Exercicio } from '../exercicio/entities/exercicio.entity';
import { ExerciciosTreino } from './entities/exercicios-treino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treino, ExerciciosTreino])],
  controllers: [TreinoController],
  providers: [TreinoService],
})
export class TreinoModule {}
