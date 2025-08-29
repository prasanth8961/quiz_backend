import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayerQuizScoreService } from './player.quiz.score.service';
import { PlayerQuizScore } from './score.entity';

@Controller('scores')
export class PlayerQuizScoreController {
    constructor(private readonly scoreService: PlayerQuizScoreService) { }

    @Post('update')
    async updateScore(
        @Body() body: { quizId: string; playerId: string; points: number },
    ): Promise<PlayerQuizScore> {
        const { quizId, playerId, points } = body;
        return this.scoreService.updateScore(quizId, playerId, points);
    }

    @Get('leaderboard/:quizId')
    getLeaderboard(@Param('quizId') quizId: string): Promise<PlayerQuizScore[]> {
        return this.scoreService.getLeaderboard(quizId);
    }

    @Get('top5/:quizId')
    getTop5(@Param('quizId') quizId: string): Promise<PlayerQuizScore[]> {
        return this.scoreService.getTop5(quizId);
    }
}
