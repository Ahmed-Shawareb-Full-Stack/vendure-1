import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiyBannerTranslationToAddFeaturedAssetRelationWithAssetEntity1697704707421 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP CONSTRAINT "FK_c4b3b3729b9012684e666b9394d"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4b3b3729b9012684e666b9394"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" RENAME COLUMN "image" TO "featuredAssetId"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP CONSTRAINT "UQ_c4b3b3729b9012684e666b9394d"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP COLUMN "bannerTranslationId"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP COLUMN "featuredAssetId"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD "featuredAssetId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD CONSTRAINT "UQ_774b8438a5e146197599ca5f12a" UNIQUE ("featuredAssetId")`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_774b8438a5e146197599ca5f12" ON "banner_translation" ("featuredAssetId") `, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD CONSTRAINT "FK_774b8438a5e146197599ca5f12a" FOREIGN KEY ("featuredAssetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP CONSTRAINT "FK_774b8438a5e146197599ca5f12a"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_774b8438a5e146197599ca5f12"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP CONSTRAINT "UQ_774b8438a5e146197599ca5f12a"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP COLUMN "featuredAssetId"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD "featuredAssetId" text NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD "bannerTranslationId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD CONSTRAINT "UQ_c4b3b3729b9012684e666b9394d" UNIQUE ("bannerTranslationId")`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" RENAME COLUMN "featuredAssetId" TO "image"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c4b3b3729b9012684e666b9394" ON "banner_translation_asset" ("bannerTranslationId") `, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD CONSTRAINT "FK_c4b3b3729b9012684e666b9394d" FOREIGN KEY ("bannerTranslationId") REFERENCES "banner_translation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
   }

}
