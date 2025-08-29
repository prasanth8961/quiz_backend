import { Question } from "src/questions/question.entity";

export interface JoinQuiz {
    quizId?: string,
    roomKey?: string,
    startingAt?: string | any,
    questions: Question[],
}