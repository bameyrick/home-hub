import { NgModule } from '@angular/core';
import { IconDirective } from './icon.directive';
import { SvgSymbolService } from './service/svg-symbol.service';

@NgModule({
  declarations: [IconDirective],
  exports: [IconDirective],
  providers: [SvgSymbolService],
})
export class IconModule {}
