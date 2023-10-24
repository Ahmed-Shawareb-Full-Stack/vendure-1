import {
  Asset,
  DeepPartial,
  LanguageCode,
  LocaleString,
  Translatable,
  Translation,
  VendureEntity,
} from '@vendure/core';
import { Entity, OneToMany, Column, Unique } from 'typeorm';
import { BannerTranslation } from './banner-translation.entity';
import { Pages, Positions } from '../types';

@Entity()
export class Banner extends VendureEntity implements Translatable {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  languageCode: LanguageCode;

  featuredAsset: Asset;

  url: LocaleString;

  @Column({
    type: 'boolean',
  })
  active: boolean;

  @Column({
    type: 'boolean',
  })
  redirectToUrl: boolean;

  @Column({
    type: 'enum',
    enum: Pages,
  })
  page: number;

  @Column({
    type: 'enum',
    enum: Positions,
  })
  position: number;

  @OneToMany((type) => BannerTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Translation<Banner>[];
}
