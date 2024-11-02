import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ResponseUsuarioDto } from './dto/response-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>) { }


  async criarUsuario(createUsuarioDto: CreateUsuarioDto): Promise<ResponseUsuarioDto> {
    const existe = await this.buscarPorEmail(createUsuarioDto.email);
    if (existe) {
      throw new BadRequestException('Já existe um usuário cadastrado com este email');
    }

    const salt = await bcrypt.genSalt();
    const senhaCriptografada = await bcrypt.hash(createUsuarioDto.senha, salt);
    createUsuarioDto.senha = senhaCriptografada;

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    const novoUsuario = await this.usuarioRepository.save(usuario).catch(err => {
      Logger.error(err);
      throw new InternalServerErrorException('Erro ao cadastrar o usuário');
    });

    return plainToInstance(ResponseUsuarioDto, novoUsuario);
  }

  async listarUsuarios(): Promise<ResponseUsuarioDto[]> {
    const usuarios = await this.usuarioRepository.find();
    return plainToInstance(ResponseUsuarioDto, usuarios);
  }


  async buscarPorEmail(email: string): Promise<ResponseUsuarioDto> {
    const usuario = await this.usuarioRepository.findOne({ where: { email: email } });

    if (!usuario) {
      return null;
    }

    return plainToInstance(ResponseUsuarioDto, usuario);
  }

}
