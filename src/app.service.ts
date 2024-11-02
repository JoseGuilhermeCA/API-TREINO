import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as db from 'db.json';
import { Repository } from 'typeorm';
import { Exercicio } from './exercicio/entities/exercicio.entity';
import { ExerciciosTreino } from './treino/entities/exercicios-treino.entity';
import { Treino } from './treino/entities/treino.entity';
import { Usuario } from './usuario/entities/usuario.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectRepository(Usuario)
  private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Treino) private readonly treinoRepository: Repository<Treino>,
    @InjectRepository(Exercicio) private readonly exercicioRepository: Repository<Exercicio>,
    @InjectRepository(ExerciciosTreino) private readonly exerciciosTreinoRepository: Repository<ExerciciosTreino>,
  ) {
  }


  async onModuleInit() {
    this.iniciarBanco();
  }


  getHello(): string {
    return 'Hello World!';
  }

  private async iniciarBanco() {
    const count = await this.usuarioRepository.count();
    if (count === 0) {
      Logger.log('Iniciando o banco de dados');

      Logger.log('Cadastrando usuários');
      const usuarios = await this.usuarioRepository.save(db.usuarios);

      Logger.log('Cadastrando exercicios');
      const exercicios = await this.exercicioRepository.save(db.exercicios);

      Logger.log('Cadastrando treinos');
      for (const treino of db.treinos) {
        const usuario = usuarios.find((u) => u.id === treino.idUsuario);

        const treinoEntity = await this.treinoRepository.save({
          data: treino.data,
          usuario,
        });
        for (const ex of treino.exercicios) {
          const exercicio = exercicios.find((e) => e.id === ex.exercicio);
          await this.exerciciosTreinoRepository.save({
            treino: treinoEntity,
            exercicio,
            series: ex.series,
            repeticoes: ex.repeticoes,
          });
        }
      }

    }
  }
}
