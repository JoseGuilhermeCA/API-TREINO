import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateExercicioTreinoDto {
    @IsNumber({}, { message: 'ID do exercício inválido' })
    @IsNotEmpty({ message: 'ID do exercício não pode ser vazio' })
    idExercicio: number;

    @IsNumber({}, { message: 'Número de séries inválido' })
    @IsNotEmpty({ message: 'Número de séries não pode ser vazio' })
    series: number;

    @IsNumber({}, { message: 'Número de repetições inválido' })
    @IsNotEmpty({ message: 'Número de repetições não pode ser vazio' })
    repeticoes: number;
}