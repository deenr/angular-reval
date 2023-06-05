import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomInputComponent,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public hint: string;
  @Input() public leadingIcon: string;
  @Input() public trailingIcon: string;
  @Input() public type = 'text';

  public touched = false;
  public disabled = false;
  public onChange = (value: string) => {};
  public onTouched = () => {};

  public get value(): any {
    return this.inputValue;
  }

  public set value(v: any) {
    if (v !== this.inputValue) {
      this.markAsTouched();
      this.inputValue = v;
      this.onChange(v);
    }
  }

  private inputValue: string;

  public writeValue(value: string): void {
    this.inputValue = value;
  }

  public registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  public markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
