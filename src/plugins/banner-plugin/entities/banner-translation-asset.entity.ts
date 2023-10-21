import { DeepPartial, ID } from '@vendure/core';
import { OrderableAsset } from '@vendure/core/dist/entity/asset/orderable-asset.entity';
import {
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BannerTranslation } from './banner-translation.entity';

@Entity()
export class BannerTranslationAsset extends OrderableAsset {
  constructor(input?: DeepPartial<BannerTranslationAsset>) {
    super(input);
  }

  // @Index()
  // @OneToOne((type) => BannerTranslation, (banner) => banner.assets, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  bannerTranslation: BannerTranslation;
}
