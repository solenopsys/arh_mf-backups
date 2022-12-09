import {NgModule} from '@angular/core';
import {IMPORTS_CONF, PROVIDERS_CONF} from "./app.module";

@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
})
export class RemoteEntryModule {}
