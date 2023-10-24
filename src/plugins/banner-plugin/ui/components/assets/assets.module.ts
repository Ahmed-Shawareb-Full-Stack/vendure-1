import { NgModule } from "@angular/core";
import { SharedModule } from "@vendure/admin-ui/core";
import { AssetsCustomComponent } from "./assets.component";

@NgModule({
  imports: [SharedModule],
  providers: [],
  declarations: [AssetsCustomComponent],
  exports: [AssetsCustomComponent],
})
export class CustomAssetsModule {}
