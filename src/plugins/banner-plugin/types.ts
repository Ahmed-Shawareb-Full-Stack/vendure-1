import { EntityAssetInput, ID, LanguageCode, Scalars } from '@vendure/core';

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
  page: Scalars['Int'];
  position: Scalars['Int'];
  active: Scalars['Boolean'];
  redirectToUrl: Scalars['Boolean'];
  translations: Array<BannerTranslationInput>;
};

export type DeleteBannerInput = {
  id: Array<Scalars['ID']>;
};

export type UpdateBannerInput = {
  id: Scalars['ID'];
  page?: Scalars['Int'];
  position?: Scalars['Int'];
  active?: Scalars['Boolean'];
  redirectToUrl?: Scalars['Boolean'];
  translations: Array<UpdateBannerTranslationInput>;
};

export enum Pages {
  PAGE1 = 1,
  PAGE2 = 2,
  PAGE3 = 3,
  PAGE4 = 4,
  PAGE5 = 5,
}

export enum Positions {
  POSITION1 = 1,
  POSITION2 = 2,
  POSITION3 = 3,
  POSITION4 = 4,
  POSITION5 = 5,
  POSITION6 = 6,
  POSITION7 = 7,
  POSITION8 = 8,
  POSITION9 = 9,
  POSITION10 = 10,
  POSITION11 = 11,
  POSITION12 = 12,
}
