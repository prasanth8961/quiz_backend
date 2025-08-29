import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepo: Repository<Question>,
    ) { }

    getAll(): Promise<Question[]> {
        return this.questionRepo.find();
    }

    async getByFilter(category?: string, limit?: number): Promise<Question[]> {
        const query = this.questionRepo.createQueryBuilder('q');

        if (category) query.andWhere('q.category = :category', { category });
        query.orderBy('RAND()');
        query.limit(Number(limit ?? 20));


        return query.getMany();
    }
}
