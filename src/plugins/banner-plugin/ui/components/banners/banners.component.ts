import { SharedModule } from '@vendure/admin-ui/core';
import { Component } from '@angular/core';

@Component({
  selector: 'banners',
  template: ` <vdr-page-block>
    <h2>{{ banners }}</h2>
  </vdr-page-block>`,
  standalone: true,
  imports: [SharedModule],
})
export class BannersComponent {
  banners = 'Banners';
}
