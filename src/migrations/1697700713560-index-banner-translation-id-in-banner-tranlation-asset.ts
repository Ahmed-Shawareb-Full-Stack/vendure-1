import {MigrationInterface, QueryRunner} from "typeorm";

export class indexBannerTranslationIdInBannerTranlationAsset1697700713560 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE INDEX "IDX_c4b3b3729b9012684e666b9394" ON "banner_translation_asset" ("bannerTranslationId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c4b3b3729b9012684e666b9394"`, undefined);
   }

}
