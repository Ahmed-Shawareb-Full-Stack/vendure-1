import {MigrationInterface, QueryRunner} from "typeorm";

export class createBannerTranslationAsset1697640232862 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1975d4afd1adec4036f5db0428"`, undefined);
        await queryRunner.query(`CREATE TABLE "banner_translation_asset" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assetId" integer NOT NULL, "position" integer NOT NULL, "bannerTranslationId" integer NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "PK_25077ff5f6ec48f1012d0f9392b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1663c1cb6ad9454161d14bf34a" ON "banner_translation_asset" ("assetId") `, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD CONSTRAINT "FK_1663c1cb6ad9454161d14bf34a3" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP CONSTRAINT "FK_1663c1cb6ad9454161d14bf34a3"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_1663c1cb6ad9454161d14bf34a"`, undefined);
        await queryRunner.query(`DROP TABLE "banner_translation_asset"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1975d4afd1adec4036f5db0428" ON "banner_translation" ("baseId") `, undefined);
   }

}
