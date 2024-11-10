import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Muscle } from "src/muscles/entities/muscle.entity";

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsArray()
    readonly primaryMuscles: Muscle[];

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    readonly secondaryMuscles?: Muscle[];
}
