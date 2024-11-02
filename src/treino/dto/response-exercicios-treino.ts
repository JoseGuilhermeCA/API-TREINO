import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ResponseExerciciosTreinoDto {
    @IsNumber()
    @Exclude({toPlainOnly: true})
    id: number;

    @IsString()
    nome: string;

    @IsString()
    descricao: string;

    @IsNumber()
    series: number;

    @IsNumber()
    repeticoes: number;

}