import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerQuizScore } from './score.entity';


@Injectable()
export class PlayerQuizScoreService {
    constructor(
        @InjectRepository(PlayerQuizScore)
        private readonly scoreRepo: Repository<PlayerQuizScore>,
    ) { }

    // --------------------------
    //  UPDATE SCORE FOR LEADERBOARD
    // --------------------------
    async updateScore(quizId: string, playerId: string, points: number): Promise<PlayerQuizScore> {
        let score = await this.scoreRepo.findOne({
            where: { quizId, playerId },
        });

        if (!score) {
            score = this.scoreRepo.create({
                quizId,
                playerId,
                score: 0,
            });
        }

        score.score += points;
        return this.scoreRepo.save(score);
    }

    // --------------------------
    //  GET ALL PLAYERS PLAYER IN THE QUIZ
    // --------------------------

    async getLeaderboard(quizId: string): Promise<any[]> {
        const scores = await this.scoreRepo.find({
            where: { quizId },
            order: { score: 'DESC' },
            relations: ['player'],
        });

        return scores.map((s) => ({
            playerId: s.player.id,
            name: s.player.name,
            score: s.score,
            totalScore: s.player.totalScore,
            joinedAt: s.player.createdAt,
        }));
    }
    // --------------------------
    //  GETIING TOP 5 PLAYERS AT PARTICULAR COMPETITION
    // --------------------------
    async getTop5(quizId: string): Promise<any[]> {
        const scores = await this.scoreRepo.find({
            where: { quizId },
            order: { score: 'DESC' },
            take: 5,
            relations: ['player'],
        });

        return scores.map((s) => ({
            playerId: s.player.id,
            name: s.player.name,
            score: s.score,
            totalScore: s.player.totalScore,
            joinedAt: s.player.createdAt,
        }));
    }

}
