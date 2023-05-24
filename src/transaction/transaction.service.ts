import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async startTransaction(): Promise<QueryRunner> {
    const queryRunner = this.entityManager.connection.createQueryRunner();

    await queryRunner.startTransaction();
    return queryRunner;
  }

  async commitTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
  }

  async rollbackTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
