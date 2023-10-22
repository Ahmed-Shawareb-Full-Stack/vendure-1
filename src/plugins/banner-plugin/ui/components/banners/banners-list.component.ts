import { SharedModule, TypedBaseListComponent } from '@vendure/admin-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import gql from 'graphql-tag';
import { GetBannerListDocument } from './../../graphql-operations';

@Component({
  selector: 'banner-list',
  templateUrl: './banner-list.component.html',
  // styleUrls: ['./review-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule],
})
export class BannerListComponent extends TypedBaseListComponent<
  typeof GetBannerListDocument,
  'getBannersPaginated',
  any
> {
  readonly filters = this.createFilterCollection()
    .addIdFilter()
    .addDateFilters()
    .addFilter({
      name: 'title',
      type: { kind: 'text' },
      label: 'Title',
      filterField: 'title',
    })
    .connectToRoute(this.route);

  readonly sorts = this.createSortCollection()
    .defaultSort('createdAt', 'DESC')
    .addSort({ name: 'createdAt' })
    .addSort({ name: 'updatedAt' })
    .addSort({ name: 'title' })
    .connectToRoute(this.route);

  constructor() {
    super();
    super.configure({
      document: GetBannerListDocument,
      getItems: (data: any) => data.getBannersPaginated,
      setVariables: (skip, take) => ({
        options: {
          skip,
          take,
          filter: {
            title: {
              contains: this.searchTermControl.value,
            },
            ...this.filters.createFilterInput(),
          },
          sort: this.sorts.createSortInput(),
        },
      }),
      refreshListOnChanges: [
        this.filters.valueChanges,
        this.sorts.valueChanges,
      ],
    });
  }
}
