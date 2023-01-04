import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppRoute } from '../../models';

@Directive()
export abstract class ComponentAbstract implements OnDestroy {
  public readonly AppRoute = AppRoute;

  protected readonly subscriptions = new Subscription();

  constructor(protected readonly elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add(this.constructor.name.split('Component')[0]);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
