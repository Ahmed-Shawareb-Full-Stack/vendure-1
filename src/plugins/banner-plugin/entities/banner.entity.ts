import {
  Asset,
  DeepPartial,
  LanguageCode,
  LocaleString,
  Translatable,
  Translation,
  VendureEntity,
} from '@vendure/core';
import { Entity, OneToMany } from 'typeorm';
import { BannerTranslation } from './banner-translation.entity';

@Entity()
export class Banner extends VendureEntity implements Translatable {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }
  title: LocaleString;
  languageCode: LanguageCode;
  featuredAsset: Asset;
  url: LocaleString;

  @OneToMany((type) => BannerTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Translation<Banner>[];
}
