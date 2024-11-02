import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { Exercicio } from './entities/exercicio.entity';

@Injectable()
export class ExercicioService {
  constructor(@InjectRepository(Exercicio)
  private readonly exercicioRepository: Repository<Exercicio>) { }
  async adicionarExercicio(createExercicioDto: CreateExercicioDto) {
    const exercicio = this.exercicioRepository.create(createExercicioDto);

    return this.exercicioRepository.save(exercicio).catch((err) => {
      Logger.error('Erro ao criar exercicio ' + err);
      throw new InternalServerErrorException('Erro ao criar exercicio');
    });

  }

  async findAll(): Promise<Exercicio[]> {
    return await this.exercicioRepository.find();
  }
}
