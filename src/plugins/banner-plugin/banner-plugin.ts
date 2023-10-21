import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { Banner } from './entities/banner.entity';
import { BannerTranslation } from './entities/banner-translation.entity';
import { BannerService } from './services/banner.service';
import { adminApiExtension } from './api/admin-api-extension';
import { BannerAdminResolver } from './api/banner.admin-api.resolver';
import { BannerTranslationAsset } from './entities/banner-translation-asset.entity';

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [Banner, BannerTranslation , BannerTranslationAsset],
  providers: [BannerService],
  adminApiExtensions: {
    schema: adminApiExtension,
    resolvers: [BannerAdminResolver],
  },
  compatibility: '^2.0.0',
})
export class BannerPlugin {}
