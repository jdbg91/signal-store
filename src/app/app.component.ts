import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PostsService} from "./post.service";
import {Observable, tap, timer} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {ApiRequest, HttpService} from "./http.service";
import {InputToggleComponent} from "./input-toggle/input-toggle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, RouterLink, InputToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-store';
  service = inject(PostsService);
  http = inject(HttpService);
  obs$!: Observable<ApiRequest<any>>;
  lastValue$!: Observable<any>;

  textValue: string = 'Initial Value';

  loadData() {
    this.service.get();
    this.obs$ = this.service.get().pipe(
      tap(console.log)
    )
  }

    protected readonly console = console;
  loading: boolean = false;

  saveText($event: string) {
    this.loading = true;
    timer(3000)
      .pipe(
        tap(() => {
          this.textValue = $event;
          this.loading = false;
        })
      )
      .subscribe()

  }
}
