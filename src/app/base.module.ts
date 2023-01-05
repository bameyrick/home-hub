import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from './icon/icon.module';
import { MillisecondsPipe } from './pipes/milliseconds.pipe';
import { ToParagraphsPipe } from './pipes/to-paragraphs.pipe';

const imports = [CommonModule, HttpClientModule, RouterModule, IconModule];

@NgModule({
  imports,
  exports: [...imports, ToParagraphsPipe, MillisecondsPipe],
  declarations: [ToParagraphsPipe, MillisecondsPipe],
})
export class BaseModule {}
