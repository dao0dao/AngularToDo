import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../app.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {


  @Output() addTask = new EventEmitter()

  today: Date = new Date()

  idTask: number = 5
  titleTask: string
  textTask: string
  dateTask: string
  priorityTask: string = 'med'

  newTaskProfile: FormGroup

  creatNewTask() {
    let newTask: Task = {
      id: this.idTask,
      title: this.newTaskProfile.get('title').value,
      text: this.newTaskProfile.get('text').value,
      date: this.newTaskProfile.get('date').value,
      status: this.newTaskProfile.get('status').value,
      priority: parseInt(this.newTaskProfile.get('priority').value)
    }
    this.idTask++
    this.addTask.emit(newTask)
    this.newTaskProfile.reset()
    this.formTitle.markAsUntouched
    this.newTaskProfile.get('priority').setValue(2)
    this.newTaskProfile.get('status').setValue('toDo')
  }

  constructor(private fb: FormBuilder) { }

  get formTitle() {
    return this.newTaskProfile.get('title')
  }

  ngOnInit() {
    this.newTaskProfile = this.fb.group({
      title: ['', [Validators.required]],
      text: [''],
      date: [''],
      status: ['toDo'],
      priority: [2],
    })
  }
}
