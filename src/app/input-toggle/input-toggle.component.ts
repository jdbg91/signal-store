import {Component, input, OnInit, output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-toggle',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input-toggle.component.html',
  styleUrl: './input-toggle.component.scss'
})
export class InputToggleComponent implements OnInit {
  value = input.required<string>();
  loading = input<boolean>(false);
  onRemove = output<string>();
  onSave = output<string>();
  editable: boolean = false;
  editValue!: string;

  ngOnInit() {
    this.editValue = this.value();
  }

  edit() {
    this.editable = true;
  }

  remove() {
    this.onRemove.emit(this.value());
  }

  save() {
    if (this.editValue !== this.value()) {
      this.onSave.emit(this.editValue);
    }
    this.editable = false;
  }

  cancel() {
    this.editable = false;
  }
}
