import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteBannerTranslationIdFromBannerTranlationAsset1697699907544 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP COLUMN "bannerTranslationId"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1975d4afd1adec4036f5db0428" ON "banner_translation" ("baseId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1975d4afd1adec4036f5db0428"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD "bannerTranslationId" integer NOT NULL`, undefined);
   }

}
