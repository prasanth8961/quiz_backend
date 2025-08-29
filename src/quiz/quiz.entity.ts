import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { PlayerQuizScore } from '../score/score.entity';
import { Question } from 'src/questions/question.entity';
import { QuizQuestion } from './quiz.question.entity';

@Entity('quiz')
export class Quiz {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    roomKey: string;

    @Column({ type: 'datetime', nullable: true })
    startingAt: Date;

    @CreateDateColumn()
    createdAt: Date;


    @ManyToMany(() => Question, (question) => question.quizzes)
    @JoinTable({
        name: 'quiz_questions',
        joinColumn: { name: 'quizId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'questionId', referencedColumnName: 'id' },
    })
    questions: Question[];


    @OneToMany(() => PlayerQuizScore, (pqs) => pqs.quiz)
    playerScores: PlayerQuizScore[];


    @OneToMany(() => QuizQuestion, (qq) => qq.quiz)
    quizQuestions: QuizQuestion[];
}
