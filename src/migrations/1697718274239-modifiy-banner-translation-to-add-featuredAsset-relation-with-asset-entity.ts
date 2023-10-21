import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiyBannerTranslationToAddFeaturedAssetRelationWithAssetEntity1697718274239 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD CONSTRAINT "featuredAssetId" FOREIGN KEY ("featuredAssetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP CONSTRAINT "featuredAssetId"`, undefined);
   }

}
