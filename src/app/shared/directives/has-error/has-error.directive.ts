import {Directive, Input, TemplateRef, ViewContainerRef, Optional, Host, SkipSelf, DoCheck} from '@angular/core';
import {FormGroupDirective, AbstractControl, FormGroup} from '@angular/forms';

@Directive({
  selector: '[hasError]'
})
export class HasErrorDirective implements DoCheck {
  @Input('hasError') public formControlName: string;
  @Input('hasErrorCode') public error: string;

  private isErrorShown = false;

  public constructor(@Optional() @Host() @SkipSelf() private parent: FormGroupDirective, private readonly templateRef: TemplateRef<any>, private readonly viewContainerRef: ViewContainerRef) {}

  public ngDoCheck(): void {
    const formControl = this.findFormControlByName(this.parent.form, this.formControlName);

    if (formControl?.hasError(this.error) && formControl?.invalid && formControl?.touched && formControl?.enabled) {
      if (!this.isErrorShown) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isErrorShown = true;
      }
    } else {
      this.viewContainerRef.clear();
      this.isErrorShown = false;
    }
  }

  private findFormControlByName(formGroup: FormGroup, controlName: string): AbstractControl | null {
    if (formGroup.get(controlName)) {
      return formGroup.get(controlName);
    }

    for (const controlKey in formGroup.controls) {
      const control = formGroup.controls[controlKey];
      if (control instanceof FormGroup) {
        const nestedFormControl = this.findFormControlByName(control, controlName);
        if (nestedFormControl) {
          return nestedFormControl;
        }
      }
    }

    return null;
  }
}
