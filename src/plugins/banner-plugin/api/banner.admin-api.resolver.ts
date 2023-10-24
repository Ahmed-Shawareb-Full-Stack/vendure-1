import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { BannerService } from '../services/banner.service';
import { Allow, Ctx, ID, PaginatedList, RequestContext } from '@vendure/core';
import { Args } from '@nestjs/graphql';
import {
  CreateBannerInput,
  DeleteBannerInput,
  UpdateBannerInput,
} from '../types';
import { Banner as BannerEntity } from '../entities/banner.entity';
import { Banner } from '../constants';

@Resolver()
export class BannerAdminResolver {
  constructor(private bannerService: BannerService) {}

  @Allow(Banner.Read)
  @Query()
  getBanner(@Ctx() ctx: RequestContext, @Args('id') id: ID) {
    return this.bannerService.getBanner(ctx, id);
  }

  @Allow(Banner.Read)
  @Query()
  getBanners(@Ctx() ctx: RequestContext) {
    return this.bannerService.getBanners(ctx);
  }

  @Allow(Banner.Read)
  @Query()
  async getBannersPaginated(
    @Ctx() ctx: RequestContext,
    @Args() args: any
  ): Promise<PaginatedList<BannerEntity>> {
    return this.bannerService.getBannersPaginated(ctx, args.options);
  }

  @Allow(Banner.Create)
  @Mutation()
  createBanner(
    @Ctx() ctx: RequestContext,
    @Args('input') input: CreateBannerInput
  ) {
    const banner = this.bannerService.createBanner(ctx, input);
    return banner;
  }

  @Allow(Banner.Update)
  @Mutation()
  updateBanner(
    @Ctx() ctx: RequestContext,
    @Args('input') input: UpdateBannerInput
  ) {
    const banner = this.bannerService.updateBanner(ctx, input);
    return banner;
  }

  @Allow(Banner.Delete)
  @Mutation()
  deleteBanner(
    @Ctx() ctx: RequestContext,
    @Args('input') input: DeleteBannerInput
  ) {
    this.bannerService.deleteBanner(ctx, input);
    return true;
  }
}
