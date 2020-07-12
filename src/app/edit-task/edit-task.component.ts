import { Component, OnInit, DoCheck, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../app.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsRequired, StartWithSpace } from '../MyValidators';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnDestroy, DoCheck {

  @Input() editedTask: Task[]
  @Output() close = new EventEmitter<boolean>()
  @Output() update = new EventEmitter<Task>()

  taskProfileForm: FormGroup
  today: Date = new Date()

  saveChanges() {
    let updateTask: Task = {
      id: this.editedTask[0].id,
      title: this.taskTitle.value,
      text: this.taskProfileForm.get('text').value,
      date: this.taskProfileForm.get('date').value,
      status: this.taskProfileForm.get('status').value,
      priority: parseInt(this.taskProfileForm.get('priority').value)
    }
    this.update.emit(updateTask)
  }

  get taskTitle() {
    return this.taskProfileForm.get('title');
  }

  closeEditor() {
    this.close.emit(false)
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    let { title, text, date, status, priority } = this.editedTask[0]
    this.taskProfileForm = this.fb.group({
      title: [title, [IsRequired(), StartWithSpace()]],
      text: [text],
      date: [date],
      status: [status],
      priority: [priority],
    })
    this.taskTitle.markAsTouched()
  }

  ngDoCheck() {
    this.taskTitle.updateValueAndValidity()
  }

  ngOnDestroy() {
    this.taskProfileForm = this.fb.group({
      title: [''],
      text: [''],
      date: [''],
      status: [''],
      priority: [''],
    })
  }
}
