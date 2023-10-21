import {MigrationInterface, QueryRunner} from "typeorm";

export class addTitleToBannerTranslation1697890842214 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" ADD "title" text NOT NULL`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner_translation" DROP COLUMN "title"`, undefined);
   }

}
