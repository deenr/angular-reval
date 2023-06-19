import {Component, OnInit} from '@angular/core';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {StubArticleOverview} from '@shared/models/article/stub-article-overview';
import {HttpArticleService} from '@shared/services/article/http-article.service';
import * as moment from 'moment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public mainArticle: ArticleOverview;
  public otherArticles: ArticleOverview[];
  public skeletonType = SkeletonType;

  public loadingArticles = true;

  public constructor(private readonly articleService: HttpArticleService) {}

  public ngOnInit(): void {
    this.getArticles();
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }

  public getImageSource(image: string): string {
    return `../../../assets/image/${image}.webp`;
  }

  private getArticles(): void {
    this.loadingArticles = true;
    this.mainArticle = StubArticleOverview.getEmptyArticleOverview();
    this.otherArticles = [...Array(9).keys()].map((index: number) => StubArticleOverview.getEmptyArticleOverviewWithId(`${index}`));
    this.articleService.getOverview().subscribe((news: ArticleOverview[]) => {
      this.mainArticle = news.shift();
      this.otherArticles = news;
      this.loadingArticles = false;
    });
  }
}
