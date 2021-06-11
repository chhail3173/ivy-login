import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Compiler, Component, ComponentFactoryResolver, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic_loading.html',
  styleUrls: ['./dynamic_loading.css']
})
export class DynamicLoading {
  @ViewChild('reactiveForm', {read: ViewContainerRef}) target:any;
  cmpRef:any =  ComponentRef;
  @Input() type:any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler,
    private cdRef: ChangeDetectorRef) {
  }

  updateComponent() {
    let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.cmpRef = this.target.createComponent(factory)
    this.cdRef.detectChanges();
  }
  ngOnChanges() {
    this.updateComponent();

  }
  ngAfterViewInit() {
    this.updateComponent();
  }
  
}
