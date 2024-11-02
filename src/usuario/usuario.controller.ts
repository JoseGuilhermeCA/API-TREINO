import { Controller, Get } from '@nestjs/common';
import { ResponseUsuarioDto } from './dto/response-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  listarUsuarios(): Promise<ResponseUsuarioDto[]> {
    return this.usuarioService.listarUsuarios();
  }
}
