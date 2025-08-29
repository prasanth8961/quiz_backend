import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerQuizScore } from './score.entity';
import { PlayerQuizScoreController } from './player.score.controller';
import { PlayerQuizScoreService } from './player.quiz.score.service';
import { Player } from 'src/player/player.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PlayerQuizScore])],
    controllers: [PlayerQuizScoreController],
    providers: [PlayerQuizScoreService],
    exports: [PlayerQuizScoreService],
})
export class ScoreModule { }
