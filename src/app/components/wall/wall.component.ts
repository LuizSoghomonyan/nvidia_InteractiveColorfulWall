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
    this.initMatrixColors()
  }


  private initMatrix() {
    this.matrixOfColors = new Array(this.settings.height);
    for(let i = 0; i < this.settings.height; ++i){
      this.matrixOfColors[i] = new Array(this.settings.width).fill('blue');
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['settings']){
      this.initMatrix();
      this.initColors();
      this.initMatrixColors()
    }
  }

  private initColors() {
    this.colorsByCount = []
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

  private initMatrixColors() {
    for (let i = 0; i < this.matrixOfColors.length; i++) {
      for(let j = 0; j < this.matrixOfColors[i].length; ++j){
        this.matrixOfColors[i][j] =  this.colorsByCount[Math.floor(Math.random() * this.settings.colorCount)]
      }
    }
  }

  onClick($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    const rowIndex = target.getAttribute('row');
    const columnIndex = target.getAttribute('column');

    if (rowIndex !== null && columnIndex !== null) {
      const i = parseInt(rowIndex, 10);
      const j = parseInt(columnIndex, 10);

      this.changeMatrixColor(i,j)



    }
  }

  private changeMatrixColor(clickedRowIndex: number, clickedColumnIndex: number) {
    if(this.settings.changeColorsDiagonally){
      this.changeMatrixColorDiagonally(clickedRowIndex, clickedColumnIndex)
    }else
      this.changeMatrixColorCross(clickedRowIndex, clickedColumnIndex)
  }


  private changeMatrixColorCross(clickedRowIndex: number,
                                 clickedColumnIndex: number) {
    // column invert
    const columnColors =
      this.matrixOfColors.map(row => row[clickedColumnIndex]);
    columnColors.reverse();
    for (let i = 0; i < this.settings.height; i++) {
      this.matrixOfColors[i][clickedColumnIndex] = columnColors[i];
    }

    // row invert
    const rowColors = this.matrixOfColors[clickedRowIndex].slice();
    rowColors.reverse();
    this.matrixOfColors[clickedRowIndex] = rowColors;


  }



  private changeMatrixColorDiagonally(clickedRowIndex: number,
                                      clickedColumnIndex: number) {

    let topDiagonalColors: string[] = [];
    let i = clickedRowIndex;
    let j = clickedColumnIndex;
    while(i != 0 && j != 0){
      topDiagonalColors.push(this.matrixOfColors[i][j])
      i--;
      j--;
    }
    topDiagonalColors.push(this.matrixOfColors[i][j])
    let firstRowIndex = i;
    let firstColumnIndex = j;

    let bottomDiagonalColors: string[] = [];
    i = clickedRowIndex + 1;
    j = clickedColumnIndex + 1;
    while(i != this.settings.height  && j != this.settings.width){
      bottomDiagonalColors.push(this.matrixOfColors[i][j])
      i++;
      j++;
    }

    for(let ind = 1; ind <= bottomDiagonalColors.length; ++ind){
      this.matrixOfColors[firstRowIndex][firstColumnIndex] =
        bottomDiagonalColors[bottomDiagonalColors.length - ind];
      firstRowIndex++;
      firstColumnIndex++;
    }


    for(let ind = 0; ind < topDiagonalColors.length; ++ind){
      this.matrixOfColors[firstRowIndex][firstColumnIndex] = topDiagonalColors[ind];
      firstRowIndex++;
      firstColumnIndex++;
    }


  }


}
