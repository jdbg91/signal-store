import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PostsService} from "./post.service";
import { Observable, scan, share, tap} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {ApiRequest, HttpService} from "./http.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-store';
  service = inject(PostsService);
  http = inject(HttpService);
  obs$!: Observable<ApiRequest<any>>;
  lastValue$!: Observable<any>;


  loadData() {
    this.service.get();
    this.obs$ = this.service.get().pipe(
      tap(console.log)
    )
  }
}
