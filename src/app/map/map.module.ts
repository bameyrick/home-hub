import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [BaseModule],
  exports: [MapComponent],
})
export class MapModule {}
