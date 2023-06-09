import {Component, ElementRef, Optional, Self, ViewChild, Input} from '@angular/core';
import {FormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {MatInput} from '@angular/material/input';
import {AbstractMatFormField} from '@helper/abstract-form-field-control';
import {MatFormFieldControl} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-custom-text-input-with-icon',
  templateUrl: './custom-text-input-with-icon.component.html',
  styleUrls: ['./custom-text-input-with-icon.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomTextInputWithIconComponent
    }
  ]
})
export class CustomTextInputWithIconComponent extends AbstractMatFormField<string> {
  @ViewChild(MatInput, {static: false}) private input: MatInput;

  @Input() public type: string;
  @Input() public leadingIcon: string;
  @Input() public trailingIcon: string;

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    _focusMonitor: FocusMonitor,
    _elementRef: ElementRef
  ) {
    super('app-custom-text-input-with-icon', ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, _focusMonitor, _elementRef);
  }

  public focus(): void {
    this.input.focus();
  }
}
