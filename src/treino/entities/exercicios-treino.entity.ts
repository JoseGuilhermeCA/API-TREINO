import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exercicio } from '../../exercicio/entities/exercicio.entity';
import { Treino } from './treino.entity';


@Entity('exercicios_treino')
export class ExerciciosTreino {
  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  @ManyToOne(() => Treino, treino => treino.exercicios)
  treino: Treino;

  @Column()
  idExercicio: number;

  @ManyToOne(() => Exercicio, exercicio => exercicio.treinosExercicios)
  @JoinColumn({ name: 'idExercicio' })
  exercicio: Exercicio;

  @Column()
  series: number;

  @Column()
  repeticoes: number;
}