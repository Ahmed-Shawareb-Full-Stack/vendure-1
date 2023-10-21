import {
  PluginCommonModule,
  ProductVariant,
  ProductVariantService,
  VendurePlugin,
} from '@vendure/core';
import { WishlistItem } from './entities/wishlist-item.entity';
import './types';
import { WishlistService } from './services/wishlist.service';
import { shopApiExtension } from './api/shop-api-extensions';
import { WishlistResolver } from './api/wishlist.resolver';

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [WishlistItem],
  providers: [WishlistService],
  shopApiExtensions: {
    schema: shopApiExtension,
    resolvers: [WishlistResolver],
  },
  configuration: (config) => {
    config.customFields.Customer.push({
      name: 'wishlistItems',
      type: 'relation',
      entity: WishlistItem,
      list: true,
      internal: true,
    });
    return config;
  },
  compatibility: '^2.0.0',
})
export class WishlistPlugin {}
