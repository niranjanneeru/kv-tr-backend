import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToMployee1691055553286 implements MigrationInterface {
    name = 'AddAgeToMployee1691055553286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
