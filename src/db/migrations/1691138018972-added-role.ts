import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRole1691138018972 implements MigrationInterface {
    name = 'AddedRole1691138018972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL DEFAULT 'DEVELOPER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
