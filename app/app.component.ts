import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Compiler, Component, ComponentFactoryResolver, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  types:any = [ReactiveFormComponent];
  constructor() {
  }

  
  
}
