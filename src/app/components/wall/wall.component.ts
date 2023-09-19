import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {getEmptyWallModel, WallModel} from "../../models/wall.model";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit, OnChanges {
  @Input() settings: WallModel = getEmptyWallModel();

  public matrixOfColors: string[][] ;
  public colorsByCount: string[];

  constructor() {
    this.matrixOfColors = [[]];
    this.colorsByCount = []
  }

  ngOnInit(): void {
    this.initMatrix();
    this.initColors();
    this.changeMatrixColors()
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
      this.initColors();
      this.changeMatrixColors()
    }
  }

  private initColors() {

    for(let i = 0; i < this.settings.colorCount; ++i){
      this.colorsByCount.push(this.generateRandomHexColor());
    }
  }
  private generateRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private changeMatrixColors() {
    for (let i = 0; i < this.matrixOfColors.length; i++) {
      for(let j = 0; j < this.matrixOfColors[i].length; ++j){
        this.matrixOfColors[i][j] =  this.colorsByCount[Math.floor(Math.random() * this.settings.colorCount)]
      }
    }
  }
}
