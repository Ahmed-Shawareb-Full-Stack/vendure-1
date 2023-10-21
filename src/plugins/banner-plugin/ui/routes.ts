import { registerRouteComponent } from '@vendure/admin-ui/core';
import { BannersComponent } from './components/banners/banners.component';

export default [
  registerRouteComponent({
    component: BannersComponent,
    path: '',
    title: 'Banners Page',
    breadcrumb: 'Banners',
  }),
];
