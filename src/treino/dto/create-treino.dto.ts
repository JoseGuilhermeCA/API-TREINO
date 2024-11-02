import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { CreateExercicioTreinoDto } from "../../exercicio/dto/create-exercicio-treino.dto";

export class CreateTreinoDto {
    @Transform(({ value }) => new Date(value))
    @IsOptional()
    @IsDate({ message: 'Data inválida' })
    data: Date;

    @IsNumber({}, { message: 'ID do usuário inválido' })
    @IsNotEmpty({ message: 'ID do usuário não pode ser vazio' })
    idUsuario: number;

    @IsArray({ message: 'Exercícios inválidos' })
    @ArrayMinSize(1, { message: 'O treino deve conter pelo menos 1 exercício' })
    @ValidateNested({ each: true })
    @Type(() => CreateExercicioTreinoDto)
    exercicios: CreateExercicioTreinoDto[];
}
