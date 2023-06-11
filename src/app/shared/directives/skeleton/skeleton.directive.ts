import {Directive, Input, TemplateRef, ViewContainerRef, SimpleChanges, ElementRef, ComponentRef} from '@angular/core';
import {SkeletonComponent} from '@custom-components/skeleton/skeleton.component';
import {SkeletonType} from './skeleton-type.enum';

@Directive({selector: '[skeleton]'})
export class SkeletonDirective {
  @Input('skeleton') public isLoading = false;
  @Input('skeletonType') public type: SkeletonType;
  @Input('skeletonWidth') public width: string;
  @Input('skeletonHeight') public height: string;

  private skeletonComponentRef: ComponentRef<SkeletonComponent>; // Reference to the created SkeletonComponent
  private wrapperDiv: HTMLElement; // Reference to the wrapper div element

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.viewContainerRef.clear();

      if (changes['isLoading'].currentValue) {
        switch (this.type) {
          case SkeletonType.FORM_FIELD:
            this.wrapperDiv = document.createElement('div');
            this.wrapperDiv.style.width = '100%';
            this.wrapperDiv.style.marginBottom = '4px';
            this.wrapperDiv.style.display = 'flex';
            this.wrapperDiv.style.flexDirection = 'column';
            this.wrapperDiv.style.gap = '6px';

            const labelRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(labelRef.instance, {
              width: '50%',
              height: '18px'
            });
            this.wrapperDiv.appendChild(labelRef.location.nativeElement);

            const inputRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(inputRef.instance, {
              width: '100%',
              height: '42px'
            });
            this.wrapperDiv.appendChild(inputRef.location.nativeElement);

            const parentElement = this.elementRef.nativeElement.parentElement;
            parentElement.insertBefore(this.wrapperDiv, this.elementRef.nativeElement.nextSibling);
            break;

          case SkeletonType.BUTTON:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              width: '100%',
              height: '42px'
            });
            break;

          case SkeletonType.DISPLAY_MD:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              width: '80%',
              height: '44px'
            });
            break;

          default:
            break;
        }
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        if (this.skeletonComponentRef) {
          this.skeletonComponentRef.destroy();
        }
        if (this.wrapperDiv) {
          this.wrapperDiv.remove();
        }
      }
    }
  }
}
