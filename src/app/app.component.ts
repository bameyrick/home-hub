import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { isEqual } from '@qntm-code/utils';
import { delay, distinctUntilChanged } from 'rxjs';
import { ComponentAbstract } from './abstracts';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { GlobalErrorEmitter } from './global-error-handler';

@Component({
  selector: 'home-hub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends ComponentAbstract {
  protected readonly baseClassName = 'App';

  constructor(elementRef: ElementRef, private readonly globalErrorEmitter: GlobalErrorEmitter, private readonly dialog: Dialog) {
    super(elementRef);

    this.subscriptions.add(
      this.globalErrorEmitter
        .pipe(
          delay(0),
          distinctUntilChanged((a, b) => isEqual(a, b))
        )
        .subscribe(error => {
          this.dialog.open<string>(ErrorDialogComponent, {
            width: '90%',
            data: { error },
          });
        })
    );
  }
}
