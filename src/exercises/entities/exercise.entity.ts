import { Muscle } from "src/muscles/entities/muscle.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Muscle, (muscle: Muscle) => muscle.exercises)
    @JoinTable({
        name: 'exercise_muscle',
        joinColumn: { name: 'exercise_id' },
        inverseJoinColumn: { name: 'muscle_id' }
    })
    muscles: Muscle[];
}
