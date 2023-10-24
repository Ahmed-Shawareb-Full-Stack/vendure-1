// import { BannerService } from './../services/banner.service';
import {
  registerBulkAction,
  addNavMenuSection,
  ModalService,
  DataService,
  NotificationService,
} from '@vendure/admin-ui/core';
import { DeleteBannerDocument } from './graphql-operations';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

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
  registerBulkAction({
    location: 'banner-list',
    label: 'Delete Banners',
    icon: 'delete',
    onClick: ({ injector, selection, hostComponent, clearSelection }) => {
      const bannerService = injector.get(DataService);
      const modalService = injector.get(ModalService);
      const notificationService = injector.get(NotificationService);
      modalService
        .dialog({
          title: `Delete ${selection.length} Banners`,
          buttons: [
            { type: 'secondary', label: 'cancel' },
            { type: 'danger', label: 'delete', returnValue: true },
          ],
        })
        .subscribe(async (response) => {
          if (response) {
            const bannerIds = selection.map((selection) => selection.id);
            bannerService
              .mutate(DeleteBannerDocument, {
                input: { id: bannerIds },
              })
              .subscribe({
                complete: () => {
                  hostComponent.refresh();
                  clearSelection();
                  notificationService.success(
                    _('common.notify-delete-success'),
                    {
                      entity: 'banner',
                    }
                  );
                },
              });
          }
        });
    },
  }),
  // addActionBarItem({
  //   id: 'edit-banner',
  //   label: 'Edit Banner',
  //   // locationId: 'banners-list',
  // }),
];
