import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Workout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;
}
