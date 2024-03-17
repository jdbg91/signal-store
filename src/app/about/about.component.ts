import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe} from "@angular/common";
import {PostState} from "../post.state";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
      AsyncPipe,
      JsonPipe
  ],
  providers: [PostState],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  postState = inject(PostState);


  loadData() {
    this.postState.loadData();
  }
}
