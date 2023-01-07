import { AfterContentInit, Directive, ElementRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { isEqual } from '@qntm-code/utils';
import { map, ReplaySubject } from 'rxjs';
import { v4 as UUID } from 'uuid';
import { ComponentAbstract } from './component.abstract';

@Directive()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class ControlAbstract<ValueType extends any | null | undefined>
  extends ComponentAbstract
  implements ControlValueAccessor, OnInit, AfterContentInit
{
  @Input() public id: string = UUID();

  @Input() public label?: string;

  private _required?: boolean;

  @Input() public set required(required: boolean) {
    this._required = required;
  }

  public get required(): boolean {
    return this._required ?? !!this.control?.control?.hasValidator(Validators.required);
  }

  private _disabled?: boolean;

  @Input() public set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  public get disabled(): boolean {
    return this._disabled ?? !!this.control?.control?.disabled;
  }

  private initialValue?: ValueType;

  public readonly value$ = new ReplaySubject<ValueType>(1);

  public readonly valueChanged$ = this.value$.pipe(map(value => !isEqual(value, this.initialValue)));

  private _onChange?: (value: ValueType) => void;

  private _onTouched?: () => void;

  private contentInitialised = false;

  protected control?: NgControl | null;

  constructor(elementRef: ElementRef, private readonly injector: Injector) {
    super(elementRef);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.control = this.injector.get<NgControl | null>(NgControl, null);
  }

  public ngAfterContentInit(): void {
    this.contentInitialised = true;
  }

  public async writeValue(value: ValueType): Promise<void> {
    this.value$.next(value);

    if (!this.contentInitialised) {
      this.initialValue = value;
    }
  }

  public setValue(value: ValueType): void {
    this.onChange(value);
    this.onTouched();
  }

  public registerOnChange(onChange: (value: ValueType) => void): void {
    this._onChange = onChange;
  }

  public onChange(value: ValueType): void {
    this.value$.next(value);

    if (this._onChange) {
      this._onChange(value);
    }
  }

  public registerOnTouched(onTouched: () => void): void {
    this._onTouched = onTouched;
  }

  public onTouched(): void {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  public setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
  }
}
