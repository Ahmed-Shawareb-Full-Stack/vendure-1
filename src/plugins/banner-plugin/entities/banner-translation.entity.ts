import {
  Asset,
  DeepPartial,
  EntityWithAssets,
  LanguageCode,
  Translatable,
  Translation,
  VendureEntity,
} from '@vendure/core';
import {
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Banner } from './banner.entity';
import { BannerTranslationAsset } from './banner-translation-asset.entity';

@Entity()
export class BannerTranslation
  extends VendureEntity
  implements Translation<Banner>
{
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column('varchar')
  languageCode: LanguageCode;

  @Column('text') url: string;

  @Column('text') title: string;

  @Column('int')
  featuredAssetId: number;

  @Index()
  @ManyToOne((type) => Banner, (base) => base.translations, {
    onDelete: 'CASCADE',
  })
  base: Banner;

  @ManyToOne((type) => Asset, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({
    foreignKeyConstraintName: 'featuredAssetId',
  })
  featuredAsset: Asset;

  // @OneToOne(
  //   (type) => BannerTranslationAsset,
  //   (asset) => asset.bannerTranslation,
  //   {
  //     eager: true,
  //   }
  // )
  assets: BannerTranslationAsset[];
}
