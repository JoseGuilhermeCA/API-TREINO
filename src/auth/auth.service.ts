import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }



  async cadastrar(createUsuarioDto: CreateUsuarioDto) {
    if (createUsuarioDto.confirmarSenha !== createUsuarioDto.senha) {
      throw new BadRequestException('As senhas devem ser iguais');
    }

    const usuario = await this.usuarioService.criarUsuario(createUsuarioDto);

    if (usuario !== null) {
      const payload = { sub: usuario.id, email: usuario.email };
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      return {
        token: await this.jwtService.signAsync(payload, {
          secret: jwtSecret,
          expiresIn: "60d" // 60 DIAS
        }),
        usuario: usuario,
      };
    }
  }

  async entrar(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    const usuario = await this.usuarioService.buscarPorEmail(email);
    if (!usuario) {
      throw new BadRequestException('Email não cadastrado');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new BadRequestException('Senha incorreta');
    }

    const payload = {
      email: usuario.email,
      sub: usuario.id,
    };
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    return {
      token: this.jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: '2592000s', // 2592000s = 30 dias
      }),
      usuario,
    };

  }
}
