import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExerciciosTreino } from "../../treino/entities/exercicios-treino.entity";

@Entity('exercicio')
export class Exercicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @OneToMany(() => ExerciciosTreino, (treinoExercicio) => treinoExercicio.exercicio)
    treinosExercicios: ExerciciosTreino[];
}
