import {
  Component,
  OnInit,
  DoCheck,
  Output,
  EventEmitter,
} from '@angular/core';
import { Task } from '../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsRequired, StartWithSpace } from '../MyValidators';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, DoCheck {
  @Output() addTask = new EventEmitter();

  today: Date = new Date();

  idTask: number = 5;
  titleTask: string;
  textTask: string;
  dateTask: string;
  priorityTask: string = 'med';

  newTaskProfile: FormGroup;

  creatNewTask() {
    let newTask: Task = {
      id: this.idTask,
      title: this.newTaskProfile.get('title').value,
      text: this.newTaskProfile.get('text').value,
      date: this.newTaskProfile.get('date').value,
      status: this.newTaskProfile.get('status').value,
      priority: parseInt(this.newTaskProfile.get('priority').value),
    };
    this.idTask++;
    this.addTask.emit(newTask);
    // this.newTaskProfile.reset();
    // this.newTaskProfile.updateValueAndValidity();

    this.formTitle.setValue('');
    this.formText.setValue('');
    this.formDate.setValue('');
    this.formStatus.setValue('toDo');
    this.formPriority.setValue(2);
    this.formTitle.markAsUntouched();
    this.formTitle.markAsPristine();
  }

  constructor(private fb: FormBuilder) {}

  get formTitle() {
    return this.newTaskProfile.get('title');
  }
  get formText() {
    return this.newTaskProfile.get('text');
  }
  get formDate() {
    return this.newTaskProfile.get('date');
  }
  get formStatus() {
    return this.newTaskProfile.get('status');
  }
  get formPriority() {
    return this.newTaskProfile.get('priority');
  }

  ngOnInit() {
    this.newTaskProfile = this.fb.group({
      title: ['', [IsRequired(), StartWithSpace()]],
      text: [''],
      date: [''],
      status: ['toDo'],
      priority: [2],
    });
  }
  ngDoCheck() {
    this.formTitle.updateValueAndValidity();
  }
}
