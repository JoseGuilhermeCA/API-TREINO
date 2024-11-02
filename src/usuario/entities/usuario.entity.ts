import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Treino } from "../../treino/entities/treino.entity";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @OneToMany(() => Treino, treino => treino.usuario, { cascade: true })
    treinos: Treino[];
}
