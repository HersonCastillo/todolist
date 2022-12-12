import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IInputBoxForm } from 'interfaces/input-box-form';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent {
  @Output() send = new EventEmitter<IInputBoxForm>();

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl(null),
  });

  onSubmit(): void {
    const { valid, value } = this.formGroup;

    if (valid) {
      this.send.emit(value!);
      this.formGroup.reset();
    }
  }

  hasError(inputName: string, errorName: string): boolean {
    return this.formGroup.get(inputName)!.hasError(errorName);
  }
}
