import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.css']
})
export class BrickComponent {
  @Input() color: string = 'white';
  @Input() rowIndex: number = 0;
  @Input() columnIndex: number = 0;

  public defaultWidth: string = '50px';
  public defaultHeight: string = '50px';
  constructor() {
  }



}
