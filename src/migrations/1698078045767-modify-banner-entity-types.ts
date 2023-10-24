import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyBannerEntityTypes1698078045767 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "UQ_9fa0f5900823d97be344d1ce885"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "UQ_9fa0f5900823d97be344d1ce885" UNIQUE ("active", "page", "position")`, undefined);
   }

}
