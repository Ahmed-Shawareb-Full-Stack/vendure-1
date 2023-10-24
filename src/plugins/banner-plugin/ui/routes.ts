import { registerRouteComponent } from '@vendure/admin-ui/core';
import { BannersComponent } from './components/banners/banners.component';
import { BannerListComponent } from './components/banners/banners-list.component';
import { BannerDetailComponent } from './components/banners/banner-detail.component';
import { GetBannerDetailsDocument } from './graphql-operations';

export default [
  registerRouteComponent({
    component: BannerListComponent,
    path: '',
    title: 'Banners Page',
    breadcrumb: 'Banners',
  }),

  registerRouteComponent({
    path: ':id',
    component: BannerDetailComponent,
    query: GetBannerDetailsDocument,
    entityKey: 'getBanner',
    getBreadcrumbs: (entity) => [
      {
        label: 'Banners',
        link: ['/extensions', 'banners'],
      },
      {
        label: `#${entity ? entity.id : ''}`,
        link: [],
      },
    ],
  }),
];
