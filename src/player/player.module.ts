import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerQuizScore } from 'src/score/score.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Player, PlayerQuizScore])],
    controllers: [PlayerController],
    providers: [PlayerService],
    exports: [PlayerService],
})
export class PlayerModule { }
