import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsString({ message: 'O nome deve ser um texto' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsEmail({}, { message: 'O email deve ser um email válido' })
    @IsNotEmpty({ message: 'O email não pode ser vazio' })
    email: string;

    @IsString({ message: 'Senha inválida' })
    @IsNotEmpty({ message: 'A senha não pode ser vazia' })
    senha: string;

    @IsString({ message: 'Confirmacão de senha inválida' })
    @IsNotEmpty({ message: 'A confirmação de senha não pode ser vazia' })
    confirmarSenha: string;
}
