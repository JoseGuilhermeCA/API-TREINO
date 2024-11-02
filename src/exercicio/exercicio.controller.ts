import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { UpdateExercicioDto } from './dto/update-exercicio.dto';
import { ExercicioService } from './exercicio.service';

@Controller('exercicio')
export class ExercicioController {
  constructor(private readonly exercicioService: ExercicioService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  adicionarExercicio(@Body() createExercicioDto: CreateExercicioDto) {
    return this.exercicioService.adicionarExercicio(createExercicioDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  consultarExercicios() {
    return this.exercicioService.findAll();
  }

}
