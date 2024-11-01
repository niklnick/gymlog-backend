import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Muscle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;
}
