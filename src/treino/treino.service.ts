import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateTreinoDto } from './dto/create-treino.dto';
import { ResponseExerciciosTreinoDto } from './dto/response-exercicios-treino';
import { ResponseTreinoDTO } from './dto/response-treino.dto';
import { Treino } from './entities/treino.entity';

@Injectable()
export class TreinoService {


  constructor(@InjectRepository(Treino)
  private readonly treinoRepository: Repository<Treino>,
  ) { }

  async adicionarTreino(createTreinoDto: CreateTreinoDto): Promise<Treino> {
    const usuario = await this.treinoRepository.findOne({ where: { id: createTreinoDto.idUsuario } });

    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const novoTreino = this.treinoRepository.create(createTreinoDto);

    novoTreino.data = new Date();

    await this.treinoRepository.save(novoTreino);

    return novoTreino;
  }

  async consultarTreinos(idUsuario: number): Promise<ResponseTreinoDTO[]> {
    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
      throw new BadRequestException('ID do usuário inválido');
    }

    const treinos = await this.treinoRepository.find({
      where: { usuario: { id: idUsuario } },
      relations: ['exercicios', 'usuario', 'exercicios.exercicio'],
    });
    Logger.log(treinos);
    let response: ResponseTreinoDTO[] = [];

    treinos.forEach(async treino => {
      const responseTreino = new ResponseTreinoDTO();
      responseTreino.data = treino.data;
      responseTreino.exercicios = treino.exercicios.map((exercicio) => plainToInstance(ResponseExerciciosTreinoDto, exercicio));
      response.push(responseTreino)
    });


    return response;
  }

}
