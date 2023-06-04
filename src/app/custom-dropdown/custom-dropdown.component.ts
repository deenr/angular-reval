import {
  Component,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent {
  @ViewChild('selectInput')
  public selectInputElement: ElementRef<HTMLInputElement>;
  @ViewChildren('listItems') public listItemElements: QueryList<ElementRef>;

  @Input() public label: string;
  @Input() public placeholder = '';
  @Input() public hint: string;
  @Input() public disabled = false;
  @Input() public options: string[];
  @Input() public value = '';

  public hoverIndex: number;
  public showDropdown = false;

  public constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('window:keydown', ['$event']) public onKeyDown(
    event: KeyboardEvent
  ) {
    if (this.showDropdown) {
      if (event.key === 'Tab' || event.key === 'Enter') {
        this.selectOption(this.options[this.hoverIndex]);
        this.closeDropdown();
      } else if (event.key === 'ArrowUp' && this.hoverIndex - 1 >= 0) {
        this.hoverIndex -= 1;
        this.scrollOptionIntoView(-1);
      } else if (
        event.key === 'ArrowDown' &&
        this.hoverIndex + 1 <= this.options.length - 1
      ) {
        this.hoverIndex += 1;
        this.scrollOptionIntoView(1);
      } else if (event.key === 'Escape') {
        this.closeDropdown();
        this.selectInputElement.nativeElement.focus();
      }
    }
  }

  public toggleDropdown() {
    if (!this.disabled) {
      this.showDropdown ? this.closeDropdown() : this.openDropdown();
    }
  }

  public openDropdown() {
    this.showDropdown = true;

    this.hoverIndex = this.value
      ? this.options.findIndex((option: string) => option === this.value)
      : 0;

    setTimeout(() => {
      this.scrollOptionIntoView(1);
    });
  }

  public closeDropdown() {
    this.showDropdown = false;
  }

  public selectOption(option: string): void {
    this.value = option;
    this.showDropdown = false;
    this.selectInputElement.nativeElement.focus();
  }

  public isOptionSelected(option: string): boolean {
    return this.value === option;
  }

  private scrollOptionIntoView(direction: number) {
    const itemElements = this.listItemElements.toArray();
    const targetElement = itemElements[this.hoverIndex].nativeElement;
    const visibleElements = this.getVisibleElements(
      (targetElement as HTMLElement).parentElement
    ).filter((element: HTMLElement) => element.tagName === 'LI');

    if (!visibleElements.includes(targetElement)) {
      if (direction === -1) {
        (targetElement as HTMLElement).parentElement.scrollTo({
          top: (targetElement as HTMLElement).offsetTop - 4,
          behavior: 'smooth',
        });
      } else {
        // I dont want to scroll instantly to the offset of the target element, I only want to scroll if the offsetTop is outside of the scrollable list
        const elementThatShouldBeVisible =
          itemElements[this.hoverIndex - 5]?.nativeElement;

        if (elementThatShouldBeVisible)
          (targetElement as HTMLElement).parentElement.scrollTo({
            top: (elementThatShouldBeVisible as HTMLElement).offsetTop - 4,
            behavior: 'smooth',
          });
      }
    }
  }

  private getVisibleElements(scrollableList: HTMLElement): HTMLElement[] {
    const listRect = scrollableList.getBoundingClientRect();
    const elements = Array.from(
      scrollableList.querySelectorAll<HTMLElement>('*')
    );

    const visibleElements = elements.filter((element) => {
      const elementRect = element.getBoundingClientRect();
      return (
        elementRect.top >= listRect.top && elementRect.bottom <= listRect.bottom
      );
    });

    return visibleElements;
  }
}
