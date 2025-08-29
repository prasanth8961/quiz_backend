import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { Question } from 'src/questions/question.entity';

@Entity('quiz_questions')
export class QuizQuestion {
    @PrimaryColumn()
    id: string;

    @Column()
    quizId: string;

    @Column()
    questionId: string;

    @Column({ nullable: true })
    order: number;

    @ManyToOne(() => Quiz, (quiz) => quiz.quizQuestions, { onDelete: 'CASCADE' })
    quiz: Quiz;

    @ManyToOne(() => Question, (question: Question) => question.quizQuestions, { onDelete: 'CASCADE' })
    question: Question;
}
