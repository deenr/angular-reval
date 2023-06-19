import {Directive, Input, TemplateRef, ViewContainerRef, SimpleChanges, ElementRef, ComponentRef} from '@angular/core';
import {SkeletonComponent} from '@custom-components/skeleton/skeleton.component';
import {SkeletonType} from './skeleton-type.enum';

@Directive({selector: '[skeleton]'})
export class SkeletonDirective {
  @Input('skeleton') public isLoading = false;
  @Input('skeletonType') public type: SkeletonType;
  @Input('skeletonWidth') public width: string;
  @Input('skeletonHeight') public height: string;
  @Input('skeletonMarginTop') public marginTop: string;

  private skeletonComponentRef: ComponentRef<SkeletonComponent>;
  private wrapperDiv: HTMLElement;

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
              marginTop: this.marginTop,
              width: this.width ?? '100%',
              height: '42px'
            });
            break;
          case SkeletonType.IMAGE:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              marginTop: this.marginTop,
              borderRadius: '16px',
              width: '100%',
              height: this.height ?? '100%'
            });
            break;
          case SkeletonType.ARTICLE_IMAGE:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              marginTop: this.marginTop,
              borderRadius: '16px',
              width: '100%',
              height: '240px'
            });
            break;
          case SkeletonType.ARTICLE_AUTHOR_IMAGE:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              marginTop: this.marginTop,
              borderRadius: '40px',
              width: '40px',
              minWidth: '40px',
              height: '40px'
            });
            break;
          case SkeletonType.ARTICLE_AUTHOR_NAME:
            this.wrapperDiv = document.createElement('div');
            this.wrapperDiv.style.width = '100%';
            this.wrapperDiv.style.display = 'flex';
            this.wrapperDiv.style.flexDirection = 'column';
            this.wrapperDiv.style.gap = '4px';

            const nameRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(nameRef.instance, {
              width: '60%',
              height: '18px'
            });
            this.wrapperDiv.appendChild(nameRef.location.nativeElement);

            const dateRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(dateRef.instance, {
              width: '35%',
              height: '18px'
            });
            this.wrapperDiv.appendChild(dateRef.location.nativeElement);

            const authorNameElement = this.elementRef.nativeElement.parentElement;
            authorNameElement.insertBefore(this.wrapperDiv, this.elementRef.nativeElement.nextSibling);
            break;
          case SkeletonType.DISPLAY_MD:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              marginTop: this.marginTop,
              width: this.width ?? '80%',
              height: '44px'
            });
            break;
          case SkeletonType.DISPLAY_XS:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              marginTop: this.marginTop,
              width: this.width ?? '75%',
              height: '32px'
            });
            break;
          case SkeletonType.TEXT_MD:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              marginTop: this.marginTop,
              width: this.width ?? '66%',
              height: '24px'
            });
            break;
          case SkeletonType.TEXT_SM:
            this.skeletonComponentRef = this.viewContainerRef.createComponent(SkeletonComponent);
            Object.assign(this.skeletonComponentRef.instance, {
              marginTop: this.marginTop,
              width: this.width ?? '40%',
              height: '20px'
            });
            break;
          // case SkeletonType.ARTICLE:
          //   this.wrapperDiv = document.createElement('div');

          //   const imgRef = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(imgRef.instance, {
          //     width: '100%',
          //     height: '240px'
          //   });
          //   this.wrapperDiv.appendChild(imgRef.location.nativeElement);

          //   const category = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(category.instance, {
          //     marginTop: '20px',
          //     width: '30%',
          //     height: '20px'
          //   });
          //   this.wrapperDiv.appendChild(category.location.nativeElement);

          //   const title = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(title.instance, {
          //     marginTop: '8px',
          //     width: '75%',
          //     height: '32px'
          //   });
          //   this.wrapperDiv.appendChild(title.location.nativeElement);

          //   const subtitle = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(subtitle.instance, {
          //     marginTop: '8px',
          //     width: '66%',
          //     height: '24px'
          //   });
          //   this.wrapperDiv.appendChild(subtitle.location.nativeElement);

          //   const articleElement = this.elementRef.nativeElement.parentElement;
          //   articleElement.insertBefore(this.wrapperDiv, this.elementRef.nativeElement.nextSibling);
          //   break;
          // case SkeletonType.MAIN_ARTICLE:
          //   this.wrapperDiv = document.createElement('div');
          //   this.wrapperDiv.style.width = '100%';
          //   this.wrapperDiv.style.aspectRatio = '7/4';

          //   const imgMainRef = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(imgMainRef.instance, {
          //     width: '100%'
          //   });
          //   this.wrapperDiv.appendChild(imgMainRef.location.nativeElement);

          //   const categoryMain = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(categoryMain.instance, {
          //     marginTop: '20px',
          //     width: '30%',
          //     height: '20px'
          //   });
          //   this.wrapperDiv.appendChild(categoryMain.location.nativeElement);

          //   const titleMain = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(titleMain.instance, {
          //     marginTop: '8px',
          //     width: '75%',
          //     height: '32px'
          //   });
          //   this.wrapperDiv.appendChild(titleMain.location.nativeElement);

          //   const subtitleMain = this.viewContainerRef.createComponent(SkeletonComponent);
          //   Object.assign(subtitleMain.instance, {
          //     marginTop: '8px',
          //     width: '66%',
          //     height: '24px'
          //   });
          //   this.wrapperDiv.appendChild(subtitleMain.location.nativeElement);

          //   const articleMainElement = this.elementRef.nativeElement.parentElement;
          //   articleMainElement.insertBefore(this.wrapperDiv, this.elementRef.nativeElement.nextSibling);
          //   break;
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
