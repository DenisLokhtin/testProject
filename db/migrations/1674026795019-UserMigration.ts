import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1674026795019 implements MigrationInterface {
    name = 'UserMigration1674026795019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "columns" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author_id" integer, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "author_id" integer, "cardId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "access_token" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "test" character varying NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "columnId" integer, "author_id" integer, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_ad367fd90928d36a0bab13c47b5" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e0d58e922daf1775d69a9965ad0" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_aba53d80092e2fffe0d70e641b7" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_d6c7615715a4278bc39efc7ecc3" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_d6c7615715a4278bc39efc7ecc3"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_aba53d80092e2fffe0d70e641b7"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e0d58e922daf1775d69a9965ad0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_ad367fd90928d36a0bab13c47b5"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "columns"`);
    }

}
