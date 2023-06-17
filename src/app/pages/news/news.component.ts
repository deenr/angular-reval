import {Component, OnInit} from '@angular/core';
import {ArticleOverview} from '@shared/models/article-overview.model';
import {Article} from '@shared/models/article.model';
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

  public constructor(private readonly articleService: HttpArticleService) {}

  public ngOnInit(): void {
    this.articleService.getOverview().subscribe((news: ArticleOverview[]) => {
      this.mainArticle = news.shift();
      this.otherArticles = news;

      console.log(this.mainArticle, this.otherArticles);
    });
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }
}
