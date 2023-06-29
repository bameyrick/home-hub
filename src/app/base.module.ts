import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from './icon/icon.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MillisecondsPipe } from './pipes/milliseconds.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { ToParagraphsPipe } from './pipes/to-paragraphs.pipe';

const imports = [CommonModule, HttpClientModule, RouterModule, IconModule];

@NgModule({
  imports,
  exports: [...imports, ToParagraphsPipe, MillisecondsPipe, ReplacePipe, PageHeaderComponent],
  declarations: [ToParagraphsPipe, MillisecondsPipe, ReplacePipe, PageHeaderComponent],
})
export class BaseModule {}
