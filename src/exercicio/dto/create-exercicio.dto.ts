import { IsNotEmpty, IsString } from "class-validator";

export class CreateExercicioDto {
    @IsString({ message: 'O nome deve ser um texto' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsString({ message: 'A descrição deve ser um texto' })
    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    descricao: string;
}
