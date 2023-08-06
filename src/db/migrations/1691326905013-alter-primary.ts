import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPrimary1691326905013 implements MigrationInterface {
    name = 'AlterPrimary1691326905013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "REL_7e77f562043393b08de949b804"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "employee_id" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_7e77f562043393b08de949b804b" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "employee_id" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "REL_7e77f562043393b08de949b804" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
