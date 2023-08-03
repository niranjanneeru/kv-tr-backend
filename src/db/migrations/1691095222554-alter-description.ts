import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDescription1691095222554 implements MigrationInterface {
    name = 'AlterDescription1691095222554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "descrption" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "description" TO "descrption"`);
    }

}
