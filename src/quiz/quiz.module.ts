import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Player } from '../player/player.entity';
import { Question } from 'src/questions/question.entity';
import { QuizQuestion } from './quiz.question.entity';
import { PlayerQuizScore } from '../score/score.entity';
import { QuestionService } from 'src/questions/question.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Quiz,
            Player,
            Question,
            QuizQuestion,
            PlayerQuizScore,
        ]),
    ],
    controllers: [QuizController],
    providers: [QuizService, QuestionService],
    exports: [QuizService],
})
export class QuizModule { }
