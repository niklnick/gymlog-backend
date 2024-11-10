import { Exercise } from "src/exercises/entities/exercise.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ orderBy: { name: 'ASC' } })
export class Equipment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Exercise, (exercise: Exercise) => exercise.equipment)
    exercises: Exercise[];
}
