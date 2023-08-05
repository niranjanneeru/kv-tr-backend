import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedJoiningDate1691231865654 implements MigrationInterface {
    name = 'AddedJoiningDate1691231865654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
    }

}
