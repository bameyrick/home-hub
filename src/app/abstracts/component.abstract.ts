import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppRoute } from '../../models';

@Directive()
export abstract class ComponentAbstract implements OnDestroy {
  public readonly AppRoute = AppRoute;

  protected readonly subscriptions = new Subscription();

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
