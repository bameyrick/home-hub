import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from './icon/icon.module';

const imports = [CommonModule, HttpClientModule, RouterModule, IconModule];

@NgModule({
  imports,
  exports: imports,
})
export class BaseModule {}
