import {Component, Input} from '@angular/core'
import { from } from 'rxjs'
import {DynamicLoading} from './dynamic_loading';
// Use dcl-wrapper component
@Component({
  selector: 'my-tab',
  template: `
  <div *ngFor="let tab of tabs">
      <app-dynamic [type] = "tab"></app-dynamic>
  </div>
`
})
export class Tabs {
    @Input() tabs:any;

}