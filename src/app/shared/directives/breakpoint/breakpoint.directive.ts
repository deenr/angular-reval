import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[classXs], [classSm], [classMd], [classLg], [classXl]'
})
export class BreakpointDirective implements OnInit, OnDestroy {
  @Input('classXs') xsClass: string;
  @Input('classSm') smClass: string;
  @Input('classMd') mdClass: string;
  @Input('classLg') lgClass: string;
  @Input('classXl') xlClass: string;

  private breakpoints = {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  };

  private resizeListener: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyStylesBasedOnViewportSize();

    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.applyStylesBasedOnViewportSize();
    });
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  private applyStylesBasedOnViewportSize(): void {
    const viewportWidth = window.innerWidth;
    const classToAdd = this.getClassToAdd(viewportWidth);

    this.clearClasses();

    if (classToAdd) {
      this.renderer.addClass(this.elementRef.nativeElement, classToAdd);
    }
  }

  private getClassToAdd(viewportWidth: number): string {
    for (const [breakpoint, breakpointWidth] of Object.entries(this.breakpoints)) {
      const breakpointClass = this.getClassForBreakpoint(breakpoint);
      if (viewportWidth <= breakpointWidth && breakpointClass) {
        return breakpointClass;
      }
    }

    return '';
  }

  private getClassForBreakpoint(breakpoint: string): string {
    switch (breakpoint) {
      case 'xs':
        return this.xsClass;
      case 'sm':
        return this.smClass;
      case 'md':
        return this.mdClass;
      case 'lg':
        return this.lgClass;
      case 'xl':
        return this.xlClass;
      default:
        return '';
    }
  }

  private clearClasses(): void {
    for (const [breakpoint, breakpointWidth] of Object.entries(this.breakpoints)) {
      const breakpointClass = this.getClassForBreakpoint(breakpoint);
      if (breakpointClass) {
        this.renderer.removeClass(this.elementRef.nativeElement, breakpointClass);
      }
    }
  }
}
