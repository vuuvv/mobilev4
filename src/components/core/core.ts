import { NgModule } from '@angular/core';

import { CORE_PIPES } from './pipes';
import { CORE_SERVICES } from './services';

@NgModule({
  declarations: [
    CORE_PIPES,
  ],
  exports: [
    CORE_PIPES,
  ],
  providers: [ CORE_SERVICES ],
})
export class CoreModule {}