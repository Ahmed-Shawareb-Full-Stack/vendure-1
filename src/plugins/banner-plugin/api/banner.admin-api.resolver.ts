import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { BannerService } from '../services/banner.service';
import { Allow, Ctx, RequestContext, Translated } from '@vendure/core';
import { Args } from '@nestjs/graphql';
import { CreateBannerInput, UpdateBannerInput } from '../types';
import { Banner } from '../constants';

@Resolver()
export class BannerAdminResolver {
  constructor(private bannerService: BannerService) {}

  @Allow(Banner.Read)
  @Query()
  getBanners(@Ctx() ctx: RequestContext) {
    return this.bannerService.getBanners(ctx);
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
