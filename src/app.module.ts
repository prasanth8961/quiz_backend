import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './config/database.config';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { QuizModule } from './quiz/quiz.module';
import { ScoreModule } from './score/score.module';
import { QuestionModule } from './questions/question.module';
import { QuizGateway } from './socket/gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    PlayerModule,
    QuizModule,
    QuestionModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [QuizGateway]
})
export class AppModule { }
