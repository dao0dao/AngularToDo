import { Component, OnInit, OnDestroy, DoCheck, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../app.component'
import { FormBuilder, FormGroup } from '@angular/forms';

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
  condition: boolean

  saveChanges() {
    let updateTask: Task = {
      id: this.editedTask[0].id,
      title: this.taskProfileForm.get('title').value,
      text: this.taskProfileForm.get('text').value,
      date: this.taskProfileForm.get('date').value,
      status: this.taskProfileForm.get('status').value,
      priority: parseInt(this.taskProfileForm.get('priority').value)
    }
    this.update.emit(updateTask)
  }

  closeEditor() {
    this.close.emit(false)
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    let { title, text, date, status, priority } = this.editedTask[0]
    this.taskProfileForm = this.fb.group({
      title: [title],
      text: [text],
      date: [date],
      status: [status],
      priority: [priority],
    })
  }
  ngDoCheck(){
    this.condition = (this.taskProfileForm.get('title').value === '' || this.taskProfileForm.get('title').value === null) && this.taskProfileForm.get('title').touched
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
