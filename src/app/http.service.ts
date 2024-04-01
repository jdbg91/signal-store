import {inject, Injectable} from "@angular/core";
import {finalize, map, Observable, scan, startWith} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  httpClient = inject(HttpClient);

  public get(url: string, params: any): Observable<ApiRequest<any>> {
    return this.httpClient.get(url, {params, observe: "response"}).pipe(
      map((response) => ({
        endTime: new Date(),
        body: response.body,
        loading: false
      })),
      startWith({
        correlationId: crypto.randomUUID(),
        startTime: new Date(),
        loading: true
      }),
      scan((acc, curr) => ({
        ...acc,
        ...curr
      })),
      finalize(() => console.log('Sequence complete'))
    );
  }
}

export interface ApiRequest<T> {
  correlationId?: string;
  startTime?: Date;
  endTime?: Date;
  body?: T;
  loading?: boolean;
}
