import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { getLinkForRoute } from '@home-hub/common';
import { Subscription } from 'rxjs';
import { AppRoute } from '../../models';
import { Icon } from '../enums';

@Directive()
export abstract class ComponentAbstract implements OnDestroy {
  public readonly AppRoute = AppRoute;
  public readonly Icon = Icon;
  public readonly getLinkForRoute = getLinkForRoute;

  protected readonly subscriptions = new Subscription();

  constructor(protected readonly elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add(this.constructor.name.split('Component')[0]);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
