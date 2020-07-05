import { Component, OnInit, Output, DoCheck, EventEmitter } from '@angular/core';
import { Task } from '../app.component'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, DoCheck {


  @Output() addTask = new EventEmitter()

  today: Date = new Date()

  idTask: number = 5
  titleTask: string
  textTask: string
  dateTask: string
  priorityTask: string = 'med'
  condition: boolean = false

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
    this.newTaskProfile.get('priority').setValue(2)
    this.newTaskProfile.get('status').setValue('toDo')
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newTaskProfile = this.fb.group({
      title: [''],
      text: [''],
      date: [''],
      status: ['toDo'],
      priority: [2],
    })
  }
  ngDoCheck() {
    this.condition = (this.newTaskProfile.get('title').value === '' || this.newTaskProfile.get('title').value === null) && this.newTaskProfile.get('title').touched
  }
}
