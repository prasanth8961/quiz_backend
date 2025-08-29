import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @Post('create')
    create(): Promise<Player> {
        return this.playerService.create();
    }

    @Get('all')
    findAll(): Promise<Player[]> {
        return this.playerService.findAll();
    }

    @Get('player/:id')
    find(@Param('id') id: string): Promise<Player | null> {
        return this.playerService.findById(id);
    }


    @Get('quiz/:quizId/players')
    getPlayers(@Param('quizId') id: string): Promise<Player[] | null> {
        return this.playerService.getPlayersInQuiz(id);
    }
}
