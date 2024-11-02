import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from '../auth/decorators/auth-user.decorator';
import { CreateTreinoDto } from './dto/create-treino.dto';
import { TreinoService } from './treino.service';

@Controller('treino')
export class TreinoController {
  constructor(private readonly treinoService: TreinoService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  adicionarTreino(@Body() createTreinoDto: CreateTreinoDto) {
    return this.treinoService.adicionarTreino(createTreinoDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  consultarTreinos(@AuthUser() usuario: any) {
    return this.treinoService.consultarTreinos(usuario.id);
  }
}
