import { ChangeDetectorRef, ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { Dictionary } from '@qntm-code/utils';

@Injectable({ providedIn: 'root' })
export class GlobalErrorEmitter extends EventEmitter<unknown> {}

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly error: GlobalErrorEmitter) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleError(error: Dictionary<any>): void {
    this.error.emit(error);

    const debugCtx = error['ngDebugContext'];
    const changeDetectorRef = debugCtx && debugCtx.injector.get(ChangeDetectorRef);

    if (changeDetectorRef) {
      changeDetectorRef.detach();
    }
  }
}
