import {
  Allow,
  Ctx,
  Permission,
  RequestContext,
  Transaction,
} from '@vendure/core';
import { WishlistService } from './../services/wishlist.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class WishlistResolver {
  constructor(private wishlistService: WishlistService) {}

  @Query()
  @Allow(Permission.Owner)
  activeCustomerWishlist(@Ctx() ctx: RequestContext) {
    return this.wishlistService.getWishlistItems(ctx);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.Owner)
  addToWishlist(
    @Ctx() ctx: RequestContext,
    @Args() { productVariantId }: { productVariantId: string }
  ) {
    return this.wishlistService.addItem(ctx, productVariantId);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.Owner)
  removeFromWishlist(
    @Ctx() ctx: RequestContext,
    @Args() { itemId }: { itemId: string }
  ) {
    return this.wishlistService.removeItem(ctx, itemId);
  }
}
