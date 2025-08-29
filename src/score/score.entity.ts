import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Player } from '../player/player.entity';
import { Quiz } from '../quiz/quiz.entity';

@Entity('player_quiz_scores')
export class PlayerQuizScore {
    @PrimaryColumn()
    id: string;

    @Column()
    quizId: string;

    @Column()
    playerId: string;

    @Column({ default: 0 })
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Player, (player) => player.scores, { onDelete: 'CASCADE' })
    player: Player;

    @ManyToOne(() => Quiz, (quiz) => quiz.playerScores, { onDelete: 'CASCADE' })
    quiz: Quiz;
}
