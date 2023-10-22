import { Injectable } from '@nestjs/common';
import {
  ID,
  ListQueryBuilder,
  ListQueryOptions,
  PaginatedList,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  Translated,
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
    private listQueryBuilder: ListQueryBuilder
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

  async getBannersPaginated(
    ctx: RequestContext,
    options?: ListQueryOptions<Banner>
  ): Promise<PaginatedList<Banner>> {
    const banners = await this.listQueryBuilder
      .build(Banner, options, { ctx })
      .getManyAndCount()
      .then(([items, totalItems]) => ({
        items,
        totalItems,
      }));
    banners.items = banners.items.map((banner) =>
      this.translatorService.translate(banner, ctx)
    );
    return banners;
  }

  async getBanners(ctx: RequestContext) {
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
