import {MigrationInterface, QueryRunner} from "typeorm";

export class bannerPlugin1697554681386 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "banner_translation" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "languageCode" character varying NOT NULL, "url" text NOT NULL, "id" SERIAL NOT NULL, "baseId" integer, CONSTRAINT "PK_e94141ae0bdcebf0000d87538e3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1975d4afd1adec4036f5db0428" ON "banner_translation" ("baseId") `, undefined);
        await queryRunner.query(`CREATE TABLE "banner" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD CONSTRAINT "FK_1975d4afd1adec4036f5db04280" FOREIGN KEY ("baseId") REFERENCES "banner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP CONSTRAINT "FK_1975d4afd1adec4036f5db04280"`, undefined);
        await queryRunner.query(`DROP TABLE "banner"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_1975d4afd1adec4036f5db0428"`, undefined);
        await queryRunner.query(`DROP TABLE "banner_translation"`, undefined);
   }

}
