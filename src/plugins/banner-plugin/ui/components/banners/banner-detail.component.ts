import {
  Banner,
  CreateBannerInput,
  GetBannerDetailsDocument,
  GetBannerDetailsQuery,
  UpdateBannerInput,
} from './../../graphql-operations';
import {
  SharedModule,
  TypedBaseDetailComponent,
  findTranslation,
  createUpdatedTranslatable,
} from '@vendure/admin-ui/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Asset, LanguageCode, Translated } from '@vendure/core';

interface SelectedAssets {
  assets?: Asset[];
  featuredAsset?: Asset;
}

@Component({
  selector: 'banner-detail',
  templateUrl: './banner-detail.component.html',
  // styleUrls: ['./review-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule],
})
export class BannerDetailComponent
  extends TypedBaseDetailComponent<typeof GetBannerDetailsDocument, 'getBanner'>
  implements OnInit, OnDestroy
{
  detailForm = this.formBuilder.group({
    title: [''],
    url: [''],
  });

  assetChanges: SelectedAssets = {};

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
  }

  assetsChanged(): boolean {
    return !!Object.values(this.assetChanges).length;
  }

  protected setFormValues(
    entity: NonNullable<GetBannerDetailsQuery['getBanner']>,
    languageCode: LanguageCode
  ): void {
    const currentTranslation = findTranslation(
      entity as any,
      languageCode
    ) as Translated<Banner>;
    this.detailForm.patchValue({
      title: entity!.title,
      url: entity!.url,
    });
  }

  private getUpdatedBanner(
    banner: NonNullable<GetBannerDetailsQuery['getBanner']>,
    bannerFormGroup: UntypedFormGroup,
    languageCode: LanguageCode
  ): UpdateBannerInput | CreateBannerInput {
    const updatedBanner = createUpdatedTranslatable({
      translatable: banner,
      updatedFields: bannerFormGroup.value,
      languageCode,
      defaultTranslation: {
        title: banner.title || '',
        url: banner.url || '',
      },
    });

    return {
      ...updatedBanner,
      assetIds: this.assetChanges.assets?.map((a) => a.id),
      featuredAssetId: this.assetChanges.featuredAsset?.id,
    };
  }
}
