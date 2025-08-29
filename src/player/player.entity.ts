import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { PlayerQuizScore } from '../score/score.entity';

@Entity('players')
export class Player {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ default: 0 })
    totalScore: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => PlayerQuizScore, (pqs) => pqs.player)
    scores: PlayerQuizScore[];
}
