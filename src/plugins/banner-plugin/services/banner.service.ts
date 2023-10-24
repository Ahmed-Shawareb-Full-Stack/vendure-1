import { Injectable } from '@nestjs/common';
import {
  ID,
  LanguageCode,
  ListQueryBuilder,
  ListQueryOptions,
  PaginatedList,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  Translated,
  TranslatorService,
  UserInputError,
} from '@vendure/core';
import { Banner } from '../entities/banner.entity';
import { BannerTranslation } from '../entities/banner-translation.entity';
import {
  CreateBannerInput,
  DeleteBannerInput,
  UpdateBannerInput,
} from '../types';

interface FindBannerOptions {
  page?: number;
  position?: number;
  active?: boolean;
  languageCode?: LanguageCode;
}
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

  async getBannerByOption(
    ctx: RequestContext,
    options: FindBannerOptions
  ): Promise<Boolean | number> {
    const banners = await this.connection.getRepository(ctx, Banner).find({
      where: {
        active: true,
        page: options.page,
        position: options.position,
      },
    });

    const activeBannersPerPage = await this.connection
      .getRepository(ctx, Banner)
      .count({
        where: {
          active: options.active,
          page: options.page,
        },
      });

    if (banners.length) return true;
    if (activeBannersPerPage >= 12) return 12;
    return false;
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
    if (input.active) {
      const existingBanner = await this.getBannerByOption(ctx, {
        page: input.page,
        position: input.position,
        active: input.active,
      });
      if (existingBanner) {
        throw new UserInputError(
          'Only one active banner should be in this page at this position'
        );
      }
      if (existingBanner === 12) {
        throw new UserInputError('Only 12 active banner are allowed per page');
      }
    }
    const banner = await this.translatableSaver.create({
      ctx,
      entityType: Banner,
      translationType: BannerTranslation,
      input,
    });
    return this.getBanner(ctx, banner.id);
  }

  async updateBanner(ctx: RequestContext, input: UpdateBannerInput) {
    const currentBanner = await this.connection
      .getRepository(ctx, Banner)
      .findOneBy({ id: input.id });

    if (!currentBanner?.active && input.active) {
      const existingBanner = await this.getBannerByOption(ctx, {
        page: input.page,
        position: input.position,
      });
      if (existingBanner) {
        throw new UserInputError(
          'Only one active banner should be in this page at this position'
        );
      }
      if (existingBanner === 12) {
        throw new UserInputError('Only 12 active banner are allowed per page');
      }
    }
    const banner = await this.translatableSaver.update({
      ctx,
      entityType: Banner,
      translationType: BannerTranslation,
      input: input,
    });

    return this.getBanner(ctx, banner.id);
  }

  async deleteBanner(ctx: RequestContext, input: DeleteBannerInput) {
    try {
      this.connection.getRepository(ctx, Banner).delete(input.id);
    } catch (error) {
      console.log(error);
    }
  }
}
