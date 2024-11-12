import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ControlValueAccessorHelper } from '@shared/helper/abstract-control-value-accessor';

@Component({
  selector: 'app-verification-code-input',
  templateUrl: './verification-code-input.component.html',
  styleUrls: ['./verification-code-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: VerificationCodeInputComponent,
      multi: true
    }
  ]
})
export class VerificationCodeInputComponent extends ControlValueAccessorHelper<string> implements OnInit {
  @Input() public invalid = false;

  public verificationCodeForm: FormGroup<{
    codeOne: FormControl<number>;
    codeTwo: FormControl<number>;
    codeThree: FormControl<number>;
    codeFour: FormControl<number>;
    codeFive: FormControl<number>;
    codeSix: FormControl<number>;
  }> = new FormGroup({
    codeOne: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    codeTwo: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    codeThree: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    codeFour: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    codeFive: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    codeSix: new FormControl(null, [Validators.required, Validators.maxLength(1)])
  });

  public formControlNames = new Map<number, string>([
    [1, 'codeOne'],
    [2, 'codeTwo'],
    [3, 'codeThree'],
    [4, 'codeFour'],
    [5, 'codeFive'],
    [6, 'codeSix']
  ]);

  public ngOnInit(): void {
    this.verificationCodeForm.valueChanges.subscribe(
      (
        verificationCode: Partial<{
          codeOne: number;
          codeTwo: number;
          codeThree: number;
          codeFour: number;
          codeFive: number;
          codeSix: number;
        }>
      ) => {
        this.value = `${verificationCode.codeOne ?? ''}${verificationCode.codeTwo ?? ''}${verificationCode.codeThree ?? ''}${verificationCode.codeFour ?? ''}${verificationCode.codeFive ?? ''}${
          verificationCode.codeSix ?? ''
        }`;
      }
    );
  }

  public focus(): void {
    let controlNameToFocus = Object.keys(this.verificationCodeForm.controls).find((controlName: string) => !this.verificationCodeForm.get(controlName).value);
    if (!controlNameToFocus) {
      const controlNamesWithCode = Object.keys(this.verificationCodeForm.controls).filter((controlName: string) => this.verificationCodeForm.get(controlName).value);
      controlNameToFocus = controlNamesWithCode[controlNamesWithCode.length - 1];
    }
    document.getElementById(controlNameToFocus)?.focus();
  }

  public isFormControlInvalid(controlNumber: number): boolean {
    return this.invalid && this.verificationCodeForm.get(this.formControlNames.get(controlNumber)).invalid;
  }

  public isVerificationCodeComplete(): boolean {
    return this.verificationCodeForm.valid;
  }

  public hasCode(controlNumber: number): boolean {
    return this.verificationCodeForm.get(this.formControlNames.get(controlNumber)).value;
  }

  public handleInput(event: Event, currentControlNumber: number): void {
    const input = event.target as HTMLInputElement;
    const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    if (numericValue !== input.value) {
      input.value = '';
      this.verificationCodeForm.get(this.formControlNames.get(currentControlNumber)).setValue(null);
    }

    if (numericValue.length >= 1) {
      const nextField = document.getElementById(this.formControlNames.get(currentControlNumber + 1));
      if (nextField) {
        nextField.focus();
      }
    }
  }

  public handlePaste(event: ClipboardEvent, currentControlNumber: number): void {
    const clipboardData = event.clipboardData;
    const pastedValue = clipboardData?.getData('text') || '';
    if (pastedValue.match(/^[0-9]+$/)) {
      const inputs = Array.from(document.querySelectorAll('input')).slice(currentControlNumber - 1) as HTMLInputElement[];

      const values = pastedValue.split('');

      inputs.forEach((input: HTMLInputElement, index: number) => {
        const value = values[index]?.replace(/[^0-9]/g, '');
        if (value) {
          input.value = value;
          this.verificationCodeForm.get(this.formControlNames.get(currentControlNumber + index)).setValue(value);
          input.focus();
        }
      });
    }
  }

  public handleBackspace(event: Event, currentControlNumber: number): void {
    const input = event.target as HTMLInputElement;

    if (input.value.length === 1) {
      // input.value = '';
      this.verificationCodeForm.get(this.formControlNames.get(currentControlNumber)).setValue(null);
    } else {
      const previousField = document.getElementById(this.formControlNames.get(currentControlNumber - 1));
      this.verificationCodeForm.get(this.formControlNames.get(currentControlNumber - 1)).setValue(null);

      if (previousField) {
        event.preventDefault();
        previousField.focus();
      }
    }
  }
}
