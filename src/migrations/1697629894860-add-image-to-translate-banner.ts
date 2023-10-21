import {MigrationInterface, QueryRunner} from "typeorm";

export class addImageToTranslateBanner1697629894860 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD "image" text NOT NULL`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP COLUMN "image"`, undefined);
   }

}
