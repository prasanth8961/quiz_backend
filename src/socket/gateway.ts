import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayerService } from '../player/player.service';
import { PlayerQuizScoreService } from 'src/score/player.quiz.score.service';
import { QuizService } from 'src/quiz/quiz.service';

@WebSocketGateway({
    cors: { origin: '*' },
})
export class QuizGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly scoreService: PlayerQuizScoreService,
        private readonly playerService: PlayerService,
        private readonly quizService: QuizService,
    ) { }

    private roomPlayers: Record<string, any[]> = {};

    // --------------------------
    //  PLAYER JOINS A QUIZ ROOM
    // --------------------------

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @MessageBody() data: { playerId: string; quizId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const { playerId, quizId } = data;

        client.join(quizId);

        const player = await this.playerService.findById(playerId);
        if (!player) {
            return { status: 'error', message: 'Player not found' };
        }

        if (!this.roomPlayers[quizId]) {
            this.roomPlayers[quizId] = [];
        }

        const alreadyExists = this.roomPlayers[quizId].some(
            (p) => p.id === player.id,
        );
        if (!alreadyExists) {
            this.roomPlayers[quizId].push({
                id: player.id,
                name: player.name,
                totalScore: player.totalScore,
                joinedAt: player.createdAt,
            });
        }


        this.server.to(quizId).emit('playersUpdated', this.roomPlayers[quizId]);

        return { status: 'joined', quizId, players: this.roomPlayers[quizId] };
    }


    // --------------------------
    //  EXPLICITLY GET ALL PLAYERS IN A QUIZ ROOM
    // --------------------------

    @SubscribeMessage('getPlayers')
    async handleGetPlayers(
        @MessageBody() quizId: string,
    ): Promise<any[]> {
        return this.roomPlayers[quizId] || [];
    }



    // --------------------------
    //  GET LEADERBOARD FOR A QUIZ ROOM
    // --------------------------

    @SubscribeMessage('getLeaderboard')
    async handleGetLeaderboard(
        @MessageBody() quizId: string,
    ) {
        const leaderboard = await this.scoreService.getLeaderboard(quizId);

        this.server.to(quizId).emit('leaderboardUpdated', leaderboard);
        return leaderboard;
    }


    // --------------------------
    //  UPDATE A PLAYER'S SCORE + REFRESH LEADERBOARD
    // --------------------------

    @SubscribeMessage('updateScore')
    async handleUpdateScore(
        @MessageBody() data: { quizId: string; playerId: string; points: number },
    ) {
        const { quizId, playerId, points } = data;

        const updated = await this.scoreService.updateScore(quizId, playerId, points);
        const leaderboard = await this.scoreService.getLeaderboard(quizId);

        this.server.to(quizId).emit('leaderboardUpdated', leaderboard);
        return updated;
    }


    // --------------------------
    //  PLAYER LEAVES THE QUIZ ROOM
    // --------------------------

    @SubscribeMessage('leaveRoom')
    async handleLeaveRoom(
        @MessageBody() data: { playerId: string; quizId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const { playerId, quizId } = data;

        client.leave(quizId);

        if (this.roomPlayers[quizId]) {
            this.roomPlayers[quizId] = this.roomPlayers[quizId].filter(
                (p) => p.id !== playerId,
            );

            this.server.to(quizId).emit('playersUpdated', this.roomPlayers[quizId]);
        }

        return { status: 'left', quizId };
    }
}
