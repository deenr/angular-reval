import {Directive, Input, TemplateRef, ViewContainerRef, SimpleChanges, ElementRef} from '@angular/core';
import {SkeletonComponent} from '@custom-components/skeleton/skeleton.component';
import {SkeletonType} from './skeleton-type.enum';

@Directive({selector: '[skeleton]'})
export class SkeletonDirective {
  @Input('skeleton') public isLoading = false;
  @Input('skeletonType') public type: SkeletonType;
  @Input('skeletonWidth') public width: string;
  @Input('skeletonHeight') public height: string;

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.viewContainerRef.clear();

      if (changes['isLoading'].currentValue) {
        switch (this.type) {
          case SkeletonType.FORM_FIELD:
            const wrapperDiv = document.createElement('div');
            wrapperDiv.style.width = '100%';
            wrapperDiv.style.marginBottom = '4px';
            wrapperDiv.style.display = 'flex';
            wrapperDiv.style.flexDirection = 'column';
            wrapperDiv.style.gap = '6px';

            const labelRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(labelRef.instance, {
              width: '50%',
              height: '18px'
            });
            wrapperDiv.appendChild(labelRef.location.nativeElement);
            const inputRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(inputRef.instance, {
              width: '100%',
              height: '42px'
            });
            wrapperDiv.appendChild(inputRef.location.nativeElement);

            const parentElement = this.elementRef.nativeElement.parentElement;
            parentElement.insertBefore(wrapperDiv, this.elementRef.nativeElement.nextSibling);
            break;
          default:
            break;
        }
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
  }
}
