import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiyBannerTranslationToAddFeaturedAssetRelationWithAssetEntity1697717099803 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP CONSTRAINT "FK_774b8438a5e146197599ca5f12a"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_774b8438a5e146197599ca5f12"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ALTER COLUMN "featuredAssetId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP CONSTRAINT "UQ_774b8438a5e146197599ca5f12a"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD CONSTRAINT "UQ_774b8438a5e146197599ca5f12a" UNIQUE ("featuredAssetId")`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ALTER COLUMN "featuredAssetId" DROP NOT NULL`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_774b8438a5e146197599ca5f12" ON "banner_translation" ("featuredAssetId") `, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD CONSTRAINT "FK_774b8438a5e146197599ca5f12a" FOREIGN KEY ("featuredAssetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
   }

}
