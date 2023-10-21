import { LanguageCode } from '@vendure/core';
import { Translated } from '@vendure/core';
import { Banner } from './../entities/banner.entity';
import gql from 'graphql-tag';

export const adminApiExtension = gql`
  type Banner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAT: DateTime
    languageCode: LanguageCode!
    url: String!
    featuredAsset: Asset!
    translations: [BannerTranslation]!
  }

  type BannerTranslation implements Node {
    id: ID!
    languageCode: LanguageCode!
    url: String!
    featuredAsset: Asset!
  }

  input CreateBannerTranslationInput {
    featuredAssetId: ID!
    assetIds: [ID]!
    languageCode: LanguageCode!
    url: String!
  }

  input UpdaterBannerTranslationInput {
    languageCode: LanguageCode!
    url: String!
    featuredAssetId: ID!
    assetIds: [ID]!
  }

  input CreateBannerInput {
    translations: [CreateBannerTranslationInput!]
  }

  input UpdateBannerInput {
    id: ID!
    translations: [UpdaterBannerTranslationInput!]
  }

  extend type Query {
    getBanners: [Banner!]
  }

  extend type Mutation {
    createBanner(input: CreateBannerInput): Banner
    updateBanner(input: UpdateBannerInput): Banner
  }
`;
