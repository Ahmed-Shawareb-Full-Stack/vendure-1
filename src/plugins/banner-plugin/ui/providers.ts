import { addActionBarItem, addNavMenuSection } from '@vendure/admin-ui/core';

export default [
  addNavMenuSection({
    id: 'banner',
    label: 'Banners',
    items: [
      {
        id: 'banners-list',
        label: 'List Banners',
        routerLink: ['/extensions/banners/'],
        icon: 'view-list',
      },
    ],
  }),
  addNavMenuSection({
    id: 'marketing',
    label: '',
    requiresPermission: '__disable__',
    items: [],
  }),
  // addActionBarItem({
  //   id: 'edit-banner',
  //   label: 'Edit Banner',
  //   // locationId: 'banners-list',
  // }),
];
