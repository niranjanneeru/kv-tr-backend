import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDate1691232542821 implements MigrationInterface {
    name = 'AlterDate1691232542821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" date NOT NULL`);
    }

}
