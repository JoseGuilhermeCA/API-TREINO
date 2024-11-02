import { Exclude, Expose, Type } from "class-transformer";
import { ResponseExerciciosTreinoDto } from "./response-exercicios-treino";
import { IsDate } from "class-validator";

export class ResponseTreinoDTO {
    @Expose()
    @IsDate()
    data: Date;

    @Type(() => ResponseExerciciosTreinoDto)
    exercicios: ResponseExerciciosTreinoDto[];


}