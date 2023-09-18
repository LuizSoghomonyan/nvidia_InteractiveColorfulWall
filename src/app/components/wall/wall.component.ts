import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {getEmptyWallModel, WallModel} from "../../models/wall.model";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit, OnChanges {
  @Input() settings: WallModel = getEmptyWallModel();

  public matrixOfColors: string[][] = [[]];

  constructor() {
  }

  ngOnInit(): void {
    this.initMatrix();
  }


  private initMatrix() {
    this.matrixOfColors = new Array(this.settings.height);
    for(let i = 0; i < this.settings.height; ++i){
      this.matrixOfColors[i] = new Array(this.settings.width).fill('blue');
    }
    console.log(this.matrixOfColors);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['settings']){
      this.initMatrix();
    }

  }
}
