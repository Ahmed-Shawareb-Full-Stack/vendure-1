import gql from 'graphql-tag';

export const adminApiExtension = gql`
  type Banner implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    url: String
    page: Int!
    position: Int!
    active: Boolean!
    redirectToUrl: Boolean!
    featuredAsset: Asset
    translations: [BannerTranslation]!
  }

  type BannerTranslation implements Node {
    id: ID!
    languageCode: LanguageCode!
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
    url: String!
  }

  input UpdaterBannerTranslationInput {
    languageCode: LanguageCode
    url: String
    featuredAssetId: ID
    assetIds: [ID]
  }

  input CreateBannerInput {
    page: Int!
    position: Int!
    active: Boolean!
    redirectToUrl: Boolean!
    translations: [CreateBannerTranslationInput!]!
  }

  input UpdateBannerInput {
    id: ID!
    page: Int
    position: Int
    active: Boolean
    redirectToUrl: Boolean
    translations: [UpdaterBannerTranslationInput!]
  }

  input DeleteBannerInput {
    id: [ID!]!
  }

  extend type Query {
    getBanners: [Banner!]
    getBannersPaginated(options: BannerListOptions): BannerList
    getBanner(id: ID): Banner
  }

  extend type Mutation {
    createBanner(input: CreateBannerInput): Banner
    updateBanner(input: UpdateBannerInput): Banner
    deleteBanner(input: DeleteBannerInput): Boolean
  }
`;
