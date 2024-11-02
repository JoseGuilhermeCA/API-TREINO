import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('cadastrar')
  @UsePipes(ValidationPipe)
  cadastrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.cadastrar(createUsuarioDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto) {
    return this.authService.entrar(loginDto);
  }
}
