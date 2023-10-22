import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { BannerService } from '../services/banner.service';
import {
  Allow,
  Ctx,
  ID,
  PaginatedList,
  RequestContext,
  Translated,
} from '@vendure/core';
import { Args } from '@nestjs/graphql';
import { CreateBannerInput, UpdateBannerInput } from '../types';
import { Banner } from '../constants';
import { Banner as BannerEntity } from '../entities/banner.entity';

@Resolver()
export class BannerAdminResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  getBanner(@Ctx() ctx: RequestContext, @Args('id') id: ID) {
    return this.bannerService.getBanner(ctx, id);
  }

  // @Allow(Banner.Read)
  @Query()
  getBanners(@Ctx() ctx: RequestContext) {
    return this.bannerService.getBanners(ctx);
  }

  // @Allow(Banner.Read)
  @Query()
  async getBannersPaginated(
    @Ctx() ctx: RequestContext,
    @Args() args: any
  ): Promise<PaginatedList<BannerEntity>> {
    return this.bannerService.getBannersPaginated(ctx, args.options);
  }

  @Mutation()
  createBanner(
    @Ctx() ctx: RequestContext,
    @Args('input') input: CreateBannerInput
  ) {
    console.log(input);
    const banner = this.bannerService.createBanner(ctx, input);
    return banner;
  }

  @Mutation()
  updateBanner(
    @Ctx() ctx: RequestContext,
    @Args('input') input: UpdateBannerInput
  ) {
    const banner = this.bannerService.updateBanner(ctx, input);
    return banner;
  }
}
