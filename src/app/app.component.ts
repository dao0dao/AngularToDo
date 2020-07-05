import { Component, ViewEncapsulation, DoCheck } from '@angular/core';

export interface Task {
  id?: number,
  title: string,
  text?: string,
  date?: string,
  status: string,
  priority: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements DoCheck {

  title = 'Lista zadań';

  visibleEditor: boolean = false
  editedTask: Task[]

  tasks: Task[] = [
    {
      id: 0,
      title: 'Zrobić obiad',
      status: 'toDo',
      text: 'opis',
      priority: 3,
      date: ''
    }, {
      id: 1,
      title: 'Zaparzyć herbatę',
      status: 'toDo',
      text: 'opis',
      priority: 2,
      date: '2020-07-10'
    }, {
      id: 2,
      title: 'Zjeść obiad',
      status: 'toDo',
      text: 'opis',
      priority: 1,
      date: '2020-07-09'
    },
    {
      id: 3,
      title: 'Wyprowadzić psa',
      status: 'done',
      text: 'opis',
      priority: 1,
      date: '2020-07-08'
    },
    {
      id: 4,
      title: 'Wyprasować ubrania',
      status: 'inProgress',
      text: 'opis',
      priority: 1,
      date: '2020-07-07'
    }]


  updateItem(updatedTask: Task) {
    this.tasks.map(task => {
      if (task.id === updatedTask.id) {
        task.status = updatedTask.status
      }
    })
  }
  doneTask(id: number) {
    this.tasks.map(task => {
      if (task.id === id) {
        task.status = "done"
      }
    })
  }

  addTask(task: Task) {
    this.tasks.push(task)
  }

  sort() {
    let copyTask = [...this.tasks]
    copyTask.map(task => { if (task.date === '') { task.date = '3000' } })
    copyTask.sort((a, b) => b.priority - a.priority)
    copyTask.sort((a, b) => a.date.localeCompare(b.date))
    copyTask.map(task => { if (task.date === '3000') { task.date = '' } })
    this.tasks = copyTask
  }
  openEditor(id: number) {
    this.visibleEditor = true
    this.editedTask = this.tasks.filter(task => task.id === id)
  }


  updateTasks(eTask: Task) {
    this.tasks.map(task => {
      if (task.id === eTask.id) {
        task.title = eTask.title
        task.text = eTask.text
        task.status = eTask.status
        task.priority = eTask.priority
        task.date = eTask.date
      }
    })
    this.visibleEditor = false
  }

  deleteTask(id: number) {
    let newtasks = this.tasks.filter(task => task.id !== id)
    this.tasks = newtasks
  }

  closeEditor(event: boolean) {
    this.visibleEditor = event
  }
  ngDoCheck() {

  }

}
