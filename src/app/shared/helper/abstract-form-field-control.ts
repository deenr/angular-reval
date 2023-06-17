import {ErrorStateMatcher, mixinErrorState} from '@angular/material/core';
import {Directive, DoCheck, ElementRef, HostBinding, HostListener, Input, OnDestroy} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormGroupDirective, NgControl, NgForm, Validators} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Subject} from 'rxjs';
import {CanUpdateErrorState} from '@angular/material/core';

class _AbstractMatFormFieldBase implements CanUpdateErrorState {
  public readonly stateChanges: Subject<void> = new Subject<void>();
  public errorState: boolean = false;

  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher, public _parentForm: NgForm, public _parentFormGroup: FormGroupDirective, public ngControl: NgControl) {}

  public errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: AbstractControl<any>, form: FormGroupDirective | NgForm): boolean => {
      const isSubmitted = form && form.submitted;
      const isControlInvalid = control && control.invalid;
      const isParentInvalid = form && form.invalid && (form.dirty || form.touched || isSubmitted);
      return !!(isControlInvalid || isParentInvalid) && (control.touched || form.touched);
    }
  };

  public updateErrorState(): void {
    const oldState = this.errorState;
    const parent = this._parentFormGroup || this._parentForm;
    const matcher = this._defaultErrorStateMatcher;

    if (!parent || !matcher) {
      return;
    }

    const control = this.ngControl && this.ngControl.control;
    const newState = matcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }
}

const _AbstractMatFormFieldMixinBase = mixinErrorState(_AbstractMatFormFieldBase);

@Directive()
export abstract class AbstractMatFormField<T> extends _AbstractMatFormFieldMixinBase implements DoCheck, OnDestroy, ControlValueAccessor, MatFormFieldControl<T> {
  protected onChange?: (value: T) => void;
  protected onTouched?: () => void;

  private static nextId: number = 0;

  @HostBinding()
  public id: string = `${this.controlType}-${AbstractMatFormField.nextId++}`;

  @HostBinding('attr.aria-describedBy')
  public describedBy: string = '';

  constructor(
    public readonly controlType: string,
    // ErrorStateMixin
    public override readonly ngControl: NgControl,
    public override readonly _parentForm: NgForm,
    public override readonly _parentFormGroup: FormGroupDirective,
    public override readonly _defaultErrorStateMatcher: ErrorStateMatcher,
    // FocusMonitor
    protected readonly _focusMonitor: FocusMonitor,
    protected readonly _elementRef: ElementRef
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    _focusMonitor.monitor(this._elementRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  public ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  public registerOnChange(fn: (_: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: T): void {
    this.value = value;
  }

  private _value: T;

  public set value(value: T) {
    this._value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  public get value(): T {
    return this._value;
  }

  public get empty(): boolean {
    return !this._value;
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public _placeholder: string = '';

  @Input()
  public set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  public get placeholder() {
    return this._placeholder;
  }

  public _required: boolean = false;

  @Input()
  public set required(required: any) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  public get required() {
    if (this.ngControl && this.ngControl.control.hasValidator(Validators.required)) {
      return true;
    }
    return this._required;
  }

  public _disabled: boolean = false;

  @Input()
  public set disabled(disabled: any) {
    this._disabled = coerceBooleanProperty(disabled);

    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  public get disabled() {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  public focused = false;

  public abstract focus(): void;

  @HostListener('focusout') public onBlur() {
    this.focused = false;
    if (this.onTouched) {
      this.onTouched();
    }
    this.stateChanges.next();
  }

  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  public onContainerClick(): void {
    if (!this.focused) {
      this.focus();
    }
  }
}
