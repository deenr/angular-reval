import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpArticleService } from '@core/services/article/http-article.service';
import { Article } from '@shared/models/article/article.model';
import { StubArticle } from '@shared/models/article/stub-article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public loadingArticle = true;
  public article: Article;

  public constructor(private readonly route: ActivatedRoute, private readonly articleService: HttpArticleService) {}

  public ngOnInit() {
    this.getArticle();
  }

  private getArticle(): void {
    this.loadingArticle = true;
    this.article = StubArticle.getEmptyArticle();
    this.articleService.getById(this.route.snapshot.paramMap.get('id')).subscribe((article: Article) => {
      this.article = article;
      this.loadingArticle = false;
    });
  }
}
