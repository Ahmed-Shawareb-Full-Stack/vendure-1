import gql from 'graphql-tag';

export const adminApiExtension = gql`
  type Banner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    title: String!
    url: String!
    featuredAsset: Asset!
    translations: [BannerTranslation]!
  }

  type BannerTranslation implements Node {
    id: ID!
    languageCode: LanguageCode!
    title: String!
    url: String!
    featuredAsset: Asset!
  }

  type BannerList implements PaginatedList {
    items: [Banner!]!
    totalItems: Int!
  }

  input BannerListOptions

  input CreateBannerTranslationInput {
    featuredAssetId: ID!
    assetIds: [ID]!
    languageCode: LanguageCode!
    title: String!
    url: String!
  }

  input UpdaterBannerTranslationInput {
    languageCode: LanguageCode!
    url: String!
    featuredAssetId: ID!
    assetIds: [ID]!
    title: String!
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
    getBannersPaginated(options: BannerListOptions): BannerList
    getBanner(id: ID): Banner
  }

  extend type Mutation {
    createBanner(input: CreateBannerInput): Banner
    updateBanner(input: UpdateBannerInput): Banner
  }
`;
