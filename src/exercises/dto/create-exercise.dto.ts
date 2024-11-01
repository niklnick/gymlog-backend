import { IsNotEmpty, IsString } from "class-validator";
import { Muscle } from "src/muscles/entities/muscle.entity";

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    readonly muscles: Muscle[];
}
