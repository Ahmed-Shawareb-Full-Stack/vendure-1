import {
  Banner,
  CreateBannerMutationDocument,
  GetBannerDetailsDocument,
  GetBannerDetailsQuery,
  UpdateBannerDetailsDocument,
  UpdateBannerInput,
} from './../../graphql-operations';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
  SharedModule,
  TypedBaseDetailComponent,
  findTranslation,
  createUpdatedTranslatable,
  NotificationService,
} from '@vendure/admin-ui/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
  ContentChild,
} from '@angular/core';
import { Asset, ID, LanguageCode, Translated } from '@vendure/core';
import { CustomAssetsModule } from '../assets/assets.module';
import { FormFieldControlDirective } from './form-field-control.directive';

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
  imports: [SharedModule, CustomAssetsModule],
})
export class BannerDetailComponent
  extends TypedBaseDetailComponent<typeof GetBannerDetailsDocument, 'getBanner'>
  implements OnInit, OnDestroy
{
  @Input() label: string;
  @Input() for: string;
  @Input() errors: { [key: string]: string } = {};
  @Input() readOnlyToggle = false;
  @ContentChild(FormFieldControlDirective, { static: true })
  formFieldControl: FormFieldControlDirective;
  isReadOnly = false;
  detailForm = this.formBuilder.group({
    // title: ['', Validators.required],
    url: ['', Validators.required],
    page: ['', Validators.required],
    position: ['', Validators.required],
    active: [false],
    redirectToUrl: [false],
  });

  assetChanges: SelectedAssets = {};

  pages = [
    { page: '1', value: 1 },
    { page: '2', value: 2 },
    { page: '3', value: 3 },
    { page: '4', value: 4 },
    { page: '5', value: 5 },
  ];

  positions = [
    { position: '1', value: 1 },
    { position: '2', value: 2 },
    { position: '3', value: 3 },
    { position: '4', value: 4 },
    { position: '5', value: 5 },
    { position: '6', value: 6 },
    { position: '7', value: 7 },
    { position: '8', value: 8 },
    { position: '9', value: 9 },
    { position: '10', value: 10 },
    { position: '11', value: 11 },
    { position: '12', value: 12 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
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

  getErrorMessage(): string | undefined {
    if (!this.formFieldControl || !this.formFieldControl.formControlName) {
      return;
    }
    const errors =
      this.formFieldControl.formControlName.dirty &&
      this.formFieldControl.formControlName.errors;
    if (errors) {
      for (const errorKey of Object.keys(errors)) {
        if (this.errors[errorKey]) {
          return this.errors[errorKey];
        }
      }
    }
  }
  create() {
    this.dataService
      .mutate(CreateBannerMutationDocument, {
        input: {
          page: this.detailForm.value.page! as any,
          position: this.detailForm.value.position! as any,
          active: this.detailForm.value.active! as any,
          redirectToUrl: this.detailForm.value.redirectToUrl! as any,
          translations: [
            {
              assetIds: [this.assetChanges!.featuredAsset!.id!.toString()],
              featuredAssetId: this.assetChanges!.featuredAsset!.id!.toString(),
              languageCode: this.languageCode as any,
              url: this.detailForm.value.url!,
            },
          ],
        },
      })
      .subscribe({
        complete: () => {
          this.assetChanges = {};
          this.detailForm.markAsPristine();
          this.router.navigate(['../'], { relativeTo: this.route });
          this.notificationService.success(_('common.notify-create-success'), {
            entity: 'banner',
          });
        },
        error: (error) => {
          this.notificationService.error(_('common.notify-create-error'), {
            entity: 'banner',
          });
        },
      });
  }

  update() {
    this.dataService
      .mutate(UpdateBannerDetailsDocument, {
        input: {
          id: this.entity!.id,
          page: this.detailForm.value.page as any,
          position: this.detailForm.value.position as any,
          active: this.detailForm.value.active as any,
          redirectToUrl: this.detailForm.value.redirectToUrl as any,
          translations: [
            {
              assetIds: [
                this.assetChanges?.featuredAsset?.id?.toString(),
              ] as any,
              featuredAssetId:
                this.assetChanges?.featuredAsset?.id?.toString() as any,
              languageCode: this.languageCode as any,
              // title: this.detailForm.value.title!,
              url: this.detailForm.value.url!,
            },
          ],
        },
      })
      .subscribe(
        (result) => {
          this.detailForm.markAsPristine();
          this.notificationService.success('common.notify-update-success', {
            entity: 'banner',
          });
        },
        (err) => {
          this.notificationService.error('common.notify-update-error', {
            entity: 'banner',
          });
        }
      );
  }

  protected setFormValues(
    entity: NonNullable<GetBannerDetailsQuery['getBanner']>,
    languageCode: LanguageCode
  ): void {
    const currentTranslation = findTranslation(entity, languageCode) as any;
    this.detailForm.patchValue({
      url: currentTranslation?.url ?? '',
      page: entity!.page as any,
      position: entity!.position as any,
      active: entity!.active as any,
      redirectToUrl: entity!.redirectToUrl as any,
    });

    this.assetChanges.featuredAsset = currentTranslation?.featuredAsset || null;
  }

  private getUpdatedBanner(
    banner: NonNullable<GetBannerDetailsQuery['getBanner']>,
    bannerFormGroup: UntypedFormGroup,
    languageCode: LanguageCode
  ) {
    const updatedBanner = createUpdatedTranslatable({
      translatable: banner,
      updatedFields: bannerFormGroup.value,
      languageCode,
      defaultTranslation: {
        // title: banner.title || '',
        url: banner.url || '',
      },
    });

    return {
      ...updatedBanner,
    };
  }
}
