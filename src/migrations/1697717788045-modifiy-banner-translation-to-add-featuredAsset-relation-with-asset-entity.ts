import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiyBannerTranslationToAddFeaturedAssetRelationWithAssetEntity1697717788045 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP CONSTRAINT "FK_c4b3b3729b9012684e666b9394d"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4b3b3729b9012684e666b9394"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP CONSTRAINT "UQ_c4b3b3729b9012684e666b9394d"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP COLUMN "bannerTranslationId"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD "bannerTranslationId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD CONSTRAINT "UQ_c4b3b3729b9012684e666b9394d" UNIQUE ("bannerTranslationId")`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c4b3b3729b9012684e666b9394" ON "banner_translation_asset" ("bannerTranslationId") `, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD CONSTRAINT "FK_c4b3b3729b9012684e666b9394d" FOREIGN KEY ("bannerTranslationId") REFERENCES "banner_translation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
   }

}
