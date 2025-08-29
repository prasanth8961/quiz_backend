import { IsDateString, IsInt, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
    @IsDateString()
    startingAt: string;

    @IsInt()
    noOfQuestions: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];
}
