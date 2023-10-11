import {Component, Input, ViewChild} from '@angular/core';
import {FormArray, FormGroup, FormControl, Validators} from '@angular/forms';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {User} from '@shared/models/user/user.model';
import {TextContentFormType, QuoteContentFormType, ImageContentFormType, ImageContentFormGroup, QuoteContentFormGroup, TextContentFormGroup} from '../add-article.component';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-add-article-content',
  templateUrl: './add-article-content.component.html',
  styleUrls: ['./add-article-content.component.scss']
})
export class AddArticleContentComponent {
  @ViewChild('changeContentMenu') public changeContentMenu: MatMenuTrigger;
  @Input() public isMobile: boolean;
  @Input() public authors: User[];
  @Input() public contentForm: FormGroup<{
    content: FormArray<TextContentFormGroup | QuoteContentFormGroup | ImageContentFormGroup>;
  }>;

  public skeletonType = SkeletonType;
  public articleContentType = ArticleContentType;

  public constructor() {}

  public isContentText(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.TEXT;
  }

  public isContentQuote(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.QUOTE;
  }

  public isContentImage(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.IMAGE;
  }

  public getTitle(contentControl: ContentFormGroup): string {
    if (contentControl.value.type === ArticleContentType.IMAGE) {
      return 'Image';
    } else if (contentControl.value.type === ArticleContentType.QUOTE) {
      return 'Quote';
    } else {
      const textContent = this.contentForm.value.content.filter((content: Partial<TextContentFormType | QuoteContentFormType | ImageContentFormType>) => content.type === ArticleContentType.TEXT);

      const index = textContent.findIndex((content: Partial<TextContentFormType>) => content === contentControl.value);

      if (index === 0) {
        return 'Introduction';
      } else if (index === textContent.length - 1) {
        return 'Conclusion';
      }

      return `Section ${index}`;
    }
  }

  public getDescription(contentControl: ContentFormGroup): string {
    return '';
  }

  public dropArticle(event: CdkDragDrop<string[]>): void {
    this.moveItemInFormArray(this.contentForm.controls.content, event.previousIndex, event.currentIndex);
  }

  public addText(): void {
    this.contentForm.controls.content.push(
      new FormGroup({
        type: new FormControl(ArticleContentType.TEXT),
        title: new FormControl(null, Validators.required),
        text: new FormControl(null, Validators.required)
      })
    );
  }

  public addImage(): void {
    this.contentForm.controls.content.push(
      new FormGroup({
        type: new FormControl(ArticleContentType.IMAGE),
        file: new FormControl(null),
        name: new FormControl(null, Validators.required),
        source: new FormControl(null, Validators.required)
      })
    );
  }

  public addQuote(): void {
    this.contentForm.controls.content.push(
      new FormGroup({
        type: new FormControl(ArticleContentType.QUOTE),
        quote: new FormControl(null, Validators.required),
        author: new FormControl(null, Validators.required)
      })
    );
  }

  public canDeleteContent(index: number): boolean {
    const canDeleteAsImage = true;

    const content = this.contentForm.controls.content.at(index);
    if (content.value.type === ArticleContentType.IMAGE) {
      const imageContents = this.contentForm.controls.content.value.filter(
        (content: Partial<TextContentFormType | QuoteContentFormType | ImageContentFormType>) => content.type == ArticleContentType.IMAGE
      );

      return imageContents.length > 1;
    }

    return index > 0 && index !== this.contentForm.controls.content.length - 1 && canDeleteAsImage;
  }

  public deleteContent(index: number): void {
    if (this.canDeleteContent(index)) {
      this.contentForm.controls.content.removeAt(index);
    }
  }

  public changeType(contentType: ArticleContentType, index: number): void {
    switch (contentType) {
      case ArticleContentType.TEXT:
        this.addText();
        break;
      case ArticleContentType.IMAGE:
        this.addImage();
        break;
      case ArticleContentType.QUOTE:
        this.addQuote();
        break;
    }

    this.deleteContent(index);

    const contentArray = this.contentForm.controls.content;
    this.moveItemInFormArray(contentArray, contentArray.length - 1, index);
  }

  public canMoveUp(index: number): boolean {
    return index !== 0;
  }

  public canMoveDown(index: number): boolean {
    const contentArray = this.contentForm.controls.content;
    return contentArray.length > 1 && index !== contentArray.length - 1;
  }

  public moveUp(index: number): void {
    if (this.canMoveUp(index)) {
      const contentArray = this.contentForm.controls.content;
      this.moveItemInFormArray(contentArray, index, index - 1);
    }
  }

  public moveDown(index: number): void {
    if (this.canMoveDown(index)) {
      const contentArray = this.contentForm.controls.content;
      this.moveItemInFormArray(contentArray, index, index + 1);
    }
  }

  public uploadFile(file: File, index: number): void {
    const reader = new FileReader();
    reader.onload = () => {
      (this.contentForm.controls.content.at(index) as ImageContentFormGroup).controls.file.setValue(file);
      (this.contentForm.controls.content.at(index) as ImageContentFormGroup).controls.name.setValue(file.name);
      (this.contentForm.controls.content.at(index) as ImageContentFormGroup).controls.source.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  public getImage(index: number): Partial<ImageContentFormType> {
    return (this.contentForm.controls.content.at(index) as ImageContentFormGroup).value;
  }

  public isImageInputInvalid(index: number): boolean {
    const imageFormControl = this.contentForm.controls.content.at(index);
    return imageFormControl.invalid && imageFormControl.touched;
  }

  private moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const dir = toIndex > fromIndex ? 1 : -1;

    const item = formArray.at(fromIndex);
    for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
      const current = formArray.at(i + dir);
      formArray.setControl(i, current);
    }

    formArray.setControl(toIndex, item);
  }
}

type ContentFormGroup = TextContentFormGroup | QuoteContentFormGroup | ImageContentFormGroup;
