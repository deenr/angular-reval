import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {Article} from '@shared/models/article/article.model';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService {
  private newsRef: AngularFirestoreCollection<Article>;

  public constructor(private readonly fireStore: AngularFirestore) {
    this.newsRef = fireStore.collection<Article>('news');
  }

  public getOverview(): Observable<ArticleOverview[]> {
    return this.newsRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<Article>[]) =>
        changes.map((change: DocumentChangeAction<Article>) =>
          ArticleOverview.fromJSON({
            id: change.payload.doc.id,
            ...change.payload.doc.data()
          })
        )
      )
    );
  }

  public getAll(): Observable<Article[]> {
    return this.newsRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<Article>[]) =>
        changes.map((change: DocumentChangeAction<Article>) =>
          Article.fromJSON({
            id: change.payload.doc.id,
            ...change.payload.doc.data()
          })
        )
      )
    );
  }

  public getArticleById(id: string): Observable<Article> {
    return this.newsRef
      .doc(id)
      .get()
      .pipe(map((articleFirestoreJSON: any) => Article.fromJSON(articleFirestoreJSON.data())));
  }
}
