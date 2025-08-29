import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Player } from 'src/player/player.entity';
import { Quiz } from 'src/quiz/quiz.entity';
import { Question } from 'src/questions/question.entity';
import { PlayerQuizScore } from 'src/score/score.entity';
import { QuizQuestion } from 'src/quiz/quiz.question.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Player, Quiz, Question, PlayerQuizScore, QuizQuestion],
  synchronize: false,
});
