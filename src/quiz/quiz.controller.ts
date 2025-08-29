import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { JoinQuiz } from './interfaces/quiz';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { }

    @Post('create')
    create(@Body() quizData: CreateQuizDto): Promise<object> {
        return this.quizService.create(quizData);
    }

    @Post('join')
    join(
        @Body('playerId') playerId: string,
        @Body('roomKey') roomKey?: string,
    ): Promise<JoinQuiz> {
        return this.quizService.joinQuiz(playerId, roomKey);
    }

    @Get('all')
    findAll(): Promise<Quiz[]> {
        return this.quizService.findAll();
    }
}
