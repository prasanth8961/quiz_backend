import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomName } from 'src/common/utils/username.util';
import { PlayerQuizScore } from 'src/score/score.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
        @InjectRepository(PlayerQuizScore)
        private readonly scoreRepo: Repository<PlayerQuizScore>,
    ) { }

    create(): Promise<Player> {
        const playerData = {
            id: uuidv4(),
            name: generateRandomName(),
            totalScore: 0,
            scores: [],
        };

        const player = this.playerRepo.create(playerData);
        return this.playerRepo.save(player);
    }

    findAll(): Promise<Player[]> {
        return this.playerRepo.find();
    }

    findById(id: string): Promise<Player | null> {
        return this.playerRepo.findOneBy({ id });
    }

    // --------------------------
    // GET ALL PLAYERS IN A QUIZ
    // --------------------------
    async getPlayersInQuiz(quizId: string): Promise<any[]> {
        const scores = await this.scoreRepo.find({
            where: { quizId },
            relations: ['player'],
        });

        return scores.map((s) => ({
            playerId: s.player.id,
            name: s.player.name,
            totalScore: s.player.totalScore,
            joinedAt: s.player.createdAt,
        }));
    }


}
