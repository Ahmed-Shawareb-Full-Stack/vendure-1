import { Injectable } from '@nestjs/common';
import {
  AssetService,
  EntityAssetInput,
  EntityWithAssets,
  ID,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  Translated,
  TranslatedInput,
  TranslatorService,
} from '@vendure/core';
import { Banner } from '../entities/banner.entity';
import { BannerTranslation } from '../entities/banner-translation.entity';
import { CreateBannerInput, UpdateBannerInput } from '../types';

@Injectable()
export class BannerService {
  constructor(
    private connection: TransactionalConnection,
    private translatorService: TranslatorService,
    private translatableSaver: TranslatableSaver,
    private assetService: AssetService
  ) {}

  async getBanner(
    ctx: RequestContext,
    id: ID
  ): Promise<Translated<Banner> | void> {
    const banner = await this.connection
      .getRepository(ctx, Banner)
      .findOneBy({ id });

    if (!banner) {
      return;
    }

    return this.translatorService.translate(banner, ctx);
  }

  async getBanners(ctx: RequestContext) {
    console.log(ctx.languageCode);
    const banners = await this.connection.getRepository(ctx, Banner).find();

    return Promise.all(
      banners.map((banner) => this.translatorService.translate(banner, ctx))
    );
  }

  async createBanner(
    ctx: RequestContext,
    input: CreateBannerInput
  ): Promise<Banner | void> {
    const banner = await this.translatableSaver.create({
      ctx,
      entityType: Banner,
      translationType: BannerTranslation,
      input,
      beforeSave: (banner) => {
        // console.log(banner);
        // banner.translations.forEach(async (t) => {
        //   console.log(t);
        //   const a = await this.assetService.updateFeaturedAsset(
        //     ctx,
        //     new BannerTranslation(t),
        //     t as EntityAssetInput
        //   );
        //   console.log(a);
        //   return a;
        // });
      },
    });

    return this.getBanner(ctx, banner.id);
  }

  async updateBanner(ctx: RequestContext, input: UpdateBannerInput) {
    const banner = await this.translatableSaver.update({
      ctx,
      entityType: Banner,
      translationType: BannerTranslation,
      input: input,
    });

    return this.getBanner(ctx, banner.id);
  }
}
