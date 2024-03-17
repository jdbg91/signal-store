import {DestroyRef, inject, Injectable, signal} from "@angular/core";
import {PostsService} from "./post.service";
import {filter, tap} from "rxjs";
import {ApiRequest} from "./http.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({providedIn: "root"})
export class PostState {
  destroyRef = inject(DestroyRef)

  private readonly service = inject(PostsService)

  private readonly state = {
    $loadDataRequest: signal<ApiRequest<any> | null>(null),
    $data: signal<any>([]),
  } as const;

  readonly $data = this.state.$data.asReadonly();
  readonly $loadDataRequest = this.state.$loadDataRequest.asReadonly();

  loadData() {
    
    this.service.get().pipe(
      tap((value) => this.state.$loadDataRequest.set(value)),
      filter(response => !!response.body),
      tap(response => this.state.$data.set(response.body)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
}
