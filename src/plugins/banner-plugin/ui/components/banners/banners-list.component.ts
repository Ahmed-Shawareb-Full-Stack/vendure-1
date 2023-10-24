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
      name: 'page',
      type: { kind: 'number' },
      label: 'Page',
      filterField: 'page',
    })
    .addFilter({
      name: 'position',
      type: { kind: 'number' },
      label: 'Position',
      filterField: 'position',
    })
    .addFilter({
      name: 'active',
      type: { kind: 'boolean' },
      label: 'Active',
      filterField: 'active',
    })
    .connectToRoute(this.route);

  readonly sorts = this.createSortCollection()
    .defaultSort('createdAt', 'DESC')
    .addSort({ name: 'createdAt' })
    .addSort({ name: 'updatedAt' })
    .addSort({ name: 'position' })
    .addSort({ name: 'page' })
    .connectToRoute(this.route);

  constructor() {
    super();            
    super.configure({
      document: GetBannerListDocument,
      getItems: (data: any) => data.getBannersPaginated,
      setVariables: (skip, take) => {
        return {
          options: {
            skip,
            take,
            filter: {
              ...this.filters.createFilterInput(),
            },
            sort: this.sorts.createSortInput(),
          },
        };
      },
      refreshListOnChanges: [
        this.filters.valueChanges,
        this.sorts.valueChanges,
      ],
    });
  }
}
