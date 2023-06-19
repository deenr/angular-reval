import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleContentType} from '@shared/enums/article-content-type.enum';
import {ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent} from '@shared/models/article/article-content.model';
import {Article} from '@shared/models/article/article.model';
import {HttpArticleService} from '@shared/services/article/http-article.service';
import * as moment from 'moment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: Article;

  public constructor(private readonly route: ActivatedRoute, private readonly articleService: HttpArticleService) {}

  public ngOnInit() {
    this.articleService.getArticleById(this.route.snapshot.paramMap.get('id')).subscribe((article: Article) => (this.article = article));
  }

  public isContentIntroduction(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.INTRODUCTION;
  }

  public getTitle(content: ArticleContent): string {
    return (content as IntroductionContent | TextContent | ConclusionContent).title;
  }

  public getText(content: ArticleContent): string[] {
    return (content as IntroductionContent).text;
  }

  public isContentImage(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.IMAGE;
  }

  public getImageSource(content: ArticleContent): string {
    return `../../../assets/image/${(content as ImageContent).source}.webp`;
  }

  public isContentText(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.TEXT;
  }

  public isContentQuote(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.QUOTE;
  }

  public getQuoteText(content: ArticleContent): string {
    return (content as QuoteContent).quote;
  }

  public getQuoteAuthor(content: ArticleContent): string {
    return (content as QuoteContent).author;
  }

  public isContentConclusion(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.CONCLUSION;
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }
}
