import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { ComponentHelperService } from './component-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {

  constructor(private componentHelper: ComponentHelperService, private componentFactoryResolver: ComponentFactoryResolver) { }
  createComponent(matchedComponent:any, containerName: ViewContainerRef, componentData:any, index?: number) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(matchedComponent);
    const componentRef = containerName.createComponent(componentFactory, index);
    Object.assign(componentRef.instance, componentData);
    // this.contextService.addToContext(componentData.uuid + 'ref', componentRef);
  }

  parseData(jsonData: any, specificContainerName: ViewContainerRef, index?: number) {
    if (jsonData.hasOwnProperty('ctype')) {
      // console.log(jsonData.ctype);
      
      let matchedComponent = this.componentHelper.determineComponent(jsonData['ctype']);
      console.log(matchedComponent);
      
        this.createComponent(matchedComponent, specificContainerName, jsonData, index);
    }
    // this.updateMethod(jsonData);
  }
}
