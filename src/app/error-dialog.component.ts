import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, Inject, ViewEncapsulation } from '@angular/core';
import { ComponentAbstract } from './abstracts';

export interface ErrorDialogData {
  error: Error;
}

@Component({
  selector: 'home-hub-error-dialog',
  styleUrls: ['./error-dialog.component.scss'],
  templateUrl: './error-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ErrorDialogComponent extends ComponentAbstract {
  protected readonly baseClassName = 'ErrorDialog';

  constructor(
    elementRef: ElementRef,
    public readonly dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public readonly data: ErrorDialogData
  ) {
    super(elementRef);
  }
}
