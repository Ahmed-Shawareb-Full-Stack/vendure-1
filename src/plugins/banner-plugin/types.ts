import { EntityAssetInput, LanguageCode, Scalars } from '@vendure/core';

export type BannerTranslationInput = {
  id?: Scalars['ID'];
  languageCode: LanguageCode;
  featuredAssetId?: Scalars['ID'];
  assetsIds?: Array<Scalars['ID']>;
  url: Scalars['String'];
};

export type UpdateBannerTranslationInput = {
  id?: Scalars['ID'];
  languageCode: LanguageCode;
  featuredAssetId: Scalars['ID'];
  assetsIds: Array<Scalars['ID']>;
  url: Scalars['String'];
};

export type CreateBannerInput = {
  id?: Scalars['ID'];
  translations: Array<BannerTranslationInput>;
};

export type UpdateBannerInput = {
  id: Scalars['ID'];
  translations: Array<UpdateBannerTranslationInput>;
};
