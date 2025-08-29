import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Player } from '../player/player.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { generateRoomKey } from 'src/common/utils/quizkey.util';
import { v4 as uuidv4 } from 'uuid';
import { QuestionService } from 'src/questions/question.service';
import { QuizQuestion } from './quiz.question.entity';
import { PlayerQuizScore } from 'src/score/score.entity';
import { Question } from 'src/questions/question.entity';
import { JoinQuiz } from './interfaces/quiz';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepo: Repository<Quiz>,
        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
        @InjectRepository(QuizQuestion)
        @InjectRepository(Question)
        private readonly questionRepo: Repository<Question>,
        @InjectRepository(QuizQuestion)
        private readonly quizQuestionsRepo: Repository<QuizQuestion>,
        @InjectRepository(PlayerQuizScore) private readonly pqsRepo: Repository<PlayerQuizScore>,
        private readonly questionService: QuestionService,
    ) { }

    // --------------------------
    //  CREATE QUIZ
    // --------------------------
    async create(quizData: CreateQuizDto): Promise<object> {
        let roomKey: string;
        do {
            roomKey = generateRoomKey();
        } while (await this.quizRepo.findOne({ where: { roomKey } }));

        const quiz = this.quizRepo.create({
            id: uuidv4(),
            roomKey,
            startingAt: new Date(quizData.startingAt),
        });
        await this.quizRepo.save(quiz);

        const questions = await this.questionService.getByFilter(
            quizData.categories?.length ? quizData.categories[0] : undefined,
            quizData.noOfQuestions,
        );

        let order = 1;
        for (const q of questions) {
            const quizQ = this.quizQuestionsRepo.create({
                id: uuidv4(),
                quizId: quiz.id,
                questionId: q.id,
                order: order++,
            });
            await this.quizQuestionsRepo.save(quizQ);
        }

        await this.quizRepo.findOne({
            where: { id: quiz.id },
            relations: ['questions', 'quizQuestions'],
        });

        return { roomKey };
    }

    findAll(): Promise<Quiz[]> {
        return this.quizRepo.find({ relations: ['questions'] });
    }

    // --------------------------
    // JOIN WITHOUT ROOM KEY
    // --------------------------
    private async joinAnonymous(): Promise<JoinQuiz> {
        const questions: Question[] = await this.questionService.getByFilter();
        return {
            questions,
        };
    }

    // --------------------------
    // JOIN WITH ROOM KEY
    // --------------------------
    private async joinWithKey(playerId: string, roomKey: string): Promise<JoinQuiz> {
        const quiz = await this.quizRepo.findOne({ where: { roomKey } });
        if (!quiz) throw new NotFoundException('Quiz not found');

        const existing = await this.pqsRepo.findOne({ where: { quizId: quiz.id, playerId } });
        if (!existing) {
            await this.pqsRepo.save(
                this.pqsRepo.create({
                    id: uuidv4(),
                    quizId: quiz.id,
                    playerId,
                    score: 0,
                }),
            );
        }

        const quizQuestions = await this.quizQuestionsRepo.find({
            where: { quizId: quiz.id },
            relations: ['question'],
            order: { order: 'ASC' },
        });

        return {
            quizId: quiz.id,
            roomKey: quiz.roomKey,
            startingAt: quiz.startingAt,
            questions: quizQuestions.map((qq) => qq.question),
        };
    }

    // --------------------------
    // PUBLIC JOIN METHOD
    // --------------------------
    async joinQuiz(playerId: string, roomKey?: string): Promise<JoinQuiz> {
        const player = await this.playerRepo.findOne({ where: { id: playerId } });
        if (!player) throw new NotFoundException('Player not found');

        if (roomKey) {
            return this.joinWithKey(playerId, roomKey);
        } else {
            return this.joinAnonymous();
        }
    }

}
