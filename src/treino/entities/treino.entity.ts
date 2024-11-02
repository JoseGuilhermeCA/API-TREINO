import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ExerciciosTreino } from "./exercicios-treino.entity";

@Entity('treino')
export class Treino {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @Column()
  idUsuario: number;

  @ManyToOne(() => Usuario, usuario => usuario.treinos)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @OneToMany(() => ExerciciosTreino, exerciciosTreino => exerciciosTreino.treino, { cascade: true })
  exercicios: ExerciciosTreino[];
}
