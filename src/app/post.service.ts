import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {delay, Observable, throwError} from "rxjs";
import {ApiRequest, HttpService} from "./http.service";

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpService);

  get(userId?: number): Observable<ApiRequest<any>> {
    if (userId == 100) {
      return throwError(() => new Error('User not found'));
    }
    return this.http
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          ...(userId ? { userId: userId.toString() } : {}),
        },
      });
  }
}
