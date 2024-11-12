import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDragScroll]'
})
export class DragScrollDirective {
  private isDragging = false;
  private isMoving = false;
  private initialX: number;
  private initialScrollLeft: number;
  private hasScrollbar: boolean;

  @HostListener('window:resize')
  public onResize() {
    this.hasScrollbar = this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth;
    this.updateCursor();
  }

  @HostListener('mousedown', ['$event'])
  public onDragStart(event: MouseEvent) {
    if (this.hasScrollbar) {
      this.isDragging = true;
      this.initialX = event.clientX;
      this.initialScrollLeft = this.elementRef.nativeElement.scrollLeft;
      this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'grabbing');
      this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', 'none');
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:mouseleave')
  public onDragEnd() {
    if (this.isDragging || this.isMoving) {
      this.isDragging = false;
      this.isMoving = false;
      this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'grab');
      this.renderer.removeStyle(this.elementRef.nativeElement, 'user-select');
    }
  }

  @HostListener('mousemove', ['$event'])
  public onDragMove(event: MouseEvent) {
    if (this.isDragging && document.getElementsByClassName('cdk-drag-preview').length > 0) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'cursor');
      this.isDragging = false;
      this.isMoving = true;
    } else if (this.isDragging) {
      const deltaX = event.clientX - this.initialX;
      this.elementRef.nativeElement.scrollLeft = this.initialScrollLeft - deltaX;
    }
  }

  public constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {}

  public ngAfterViewInit() {
    this.hasScrollbar = this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth;
    this.updateCursor();
  }

  private updateCursor() {
    const cursorStyle = this.hasScrollbar ? 'grab' : 'auto';
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', cursorStyle);
  }
}
