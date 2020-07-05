import { Component, Input, DoCheck, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Task } from '../app.component'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements DoCheck {

  @Input() tasks: Task[]
  @Output() updateItem = new EventEmitter()
  @Output() doneItem = new EventEmitter<number>()
  @Output() editTask = new EventEmitter<number>()
  @Output() deleteItem = new EventEmitter<number>()

  todo: Task[]
  inProgress: Task[]
  done: Task[]

  movedItem: Task
  listType: string

  styleCondition(priority: number) {
    switch (priority) {
      case 3:
        return { borderLeft: '5px solid red' }
        break;
      case 2:
        return { borderLeft: '5px solid orange' }
        break;
      case 1:
        return { borderLeft: '5px solid rgb(23,176,180)' }
        break;
    }
  }
  namePriority(priority: number) {
    switch (priority) {
      case 3:
        return 'Wysoki'
        break;
      case 2:
        return 'Średni'
        break;
      case 1:
        return 'Niski'
        break;
    }
  }

  updateArray() {
    switch (this.listType) {
      case 'todo':
        this.movedItem.status = 'toDo'
        break;
      case 'inProgress':
        this.movedItem.status = 'inProgress'
        break;
      case 'done':
        this.movedItem.status = 'done'
        break;
    }
    this.updateItem.emit(this.movedItem)
  }


  doneTask(id: number) {
    this.doneItem.emit(id)
  }

  edit(id: number) {
    this.editTask.emit(id)
  }

  delete(id: number) {
    this.deleteItem.emit(id)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.movedItem = event.item.data
      this.listType = event.container.element.nativeElement.getAttribute('data-typeList')
      this.updateArray();
    }
  }
  ngDoCheck() {
    this.todo = this.tasks.filter(task => task.status === 'toDo');
    this.done = this.tasks.filter(task => task.status === 'done');
    this.inProgress = this.tasks.filter(task => task.status === 'inProgress')
  }
}
