import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAge1691075768914 implements MigrationInterface {
    name = 'RemoveAge1691075768914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer`);
    }

}
