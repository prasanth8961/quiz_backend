import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { QuizQuestion } from 'src/quiz/quiz.question.entity';

@Entity('questions')
export class Question {
    @PrimaryColumn()
    id: string;

    @Column('text')
    title: string;

    @Column('json')
    options: any;

    @Column()
    correctAnswer: string;

    @Column({ nullable: true })
    category: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Quiz, (quiz) => quiz.questions)
    quizzes: Quiz[];

    @OneToMany(() => QuizQuestion, (qq) => qq.question)
    quizQuestions: QuizQuestion[];
}
