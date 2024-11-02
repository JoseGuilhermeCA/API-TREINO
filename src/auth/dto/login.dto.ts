import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'O email não pode ser vazio' })
    email: string;

    @IsString({ message: 'Senha inválida' })
    @IsNotEmpty({ message: 'A senha não pode ser vazia' })
    senha: string;
}