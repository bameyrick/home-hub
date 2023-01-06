import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from '@qntm-code/utils';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IsVisbileComponentAbstract } from '../../abstracts';

@Component({
  selector: 'home-hub-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompassComponent extends IsVisbileComponentAbstract implements OnInit, OnChanges {
  @Input() public direction?: number = 0;

  private direction$ = new BehaviorSubject<number>(0);

  public transform = 'rotate(0deg)';

  public override ngOnInit(): void {
    super.ngOnInit();

    combineLatest([this.direction$, this.visible$]).subscribe(([direction, visible]) => {
      if (visible) {
        this.transform = `rotate(${direction}deg)`;
      }
    });
  }

  public ngOnChanges(): void {
    if (!isNullOrUndefined(this.direction)) {
      this.direction$.next(this.direction);
    }
  }
}
