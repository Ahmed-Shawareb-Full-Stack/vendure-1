import {MigrationInterface, QueryRunner} from "typeorm";

export class assignBannerTranslationIdToBannerTranlationAsset1697700388415 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD "bannerTranslationId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD CONSTRAINT "UQ_c4b3b3729b9012684e666b9394d" UNIQUE ("bannerTranslationId")`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" ADD CONSTRAINT "FK_c4b3b3729b9012684e666b9394d" FOREIGN KEY ("bannerTranslationId") REFERENCES "banner_translation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP CONSTRAINT "FK_c4b3b3729b9012684e666b9394d"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP CONSTRAINT "UQ_c4b3b3729b9012684e666b9394d"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_translation_asset" DROP COLUMN "bannerTranslationId"`, undefined);
   }

}
