import { Controller, Get, Query } from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Get('all')
    getAll(): Promise<Question[]> {
        return this.questionService.getAll();
    }

    @Get('filter')
    getByFilter(
        @Query('category') category?: string,
        @Query('limit') limit?: number,
    ): Promise<Question[]> {
        return this.questionService.getByFilter(category, limit);
    }
}
