import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getEmptyWallModel, WallModel} from "./models/wall.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InteractiveColorfulWall';

  public form: FormGroup;
  private sendInputsIsClicked: boolean = false;

  constructor() {
    this.form = new FormGroup({
      width: new FormControl<number>(7,[Validators.required]),
      height: new FormControl<number>(9,[Validators.required]),
      colorCount: new FormControl<number>(12,[Validators.required]),
      changeColorsDiagonally: new FormControl<boolean>(true)
    })
  }


  public wallSetting: WallModel = getEmptyWallModel();
  public sendInputs() {
    if(this.form.valid){
      this.wallSetting = {
        width: this.form.get('width')?.value,
        height:  this.form.get('height')?.value,
        colorCount: this.form.get('colorCount')?.value,
        changeColorsDiagonally: this.form.get('changeColorsDiagonally')?.value,

      }
      this.sendInputsIsClicked = true
    }else
      this.sendInputsIsClicked = false

  }

  isHiddenWall() {
    return this.form.invalid && !this.sendInputsIsClicked;
  }
}
