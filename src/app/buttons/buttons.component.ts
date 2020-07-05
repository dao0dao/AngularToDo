import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {


  @Input() idItem: number
  @Input() taskStatus: string

  @Output() deletedItem = new EventEmitter<number>()
  @Output() editTask = new EventEmitter<number>()
  @Output() doneItem = new EventEmitter<number>()

  condition : string = 'done'

  done() {
    this.doneItem.emit(this.idItem)
  }

  edit() {
    this.editTask.emit(this.idItem)
  }

  delete() {
    this.deletedItem.emit(this.idItem)
  }


}
