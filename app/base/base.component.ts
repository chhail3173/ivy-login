import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentLoaderService } from '../component-loader.service';
import { MetadataService } from '../metadata.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container:any =  ViewContainerRef;

  constructor(private metadataService: MetadataService, private componentLoaderService: ComponentLoaderService) { }

  ngOnInit(): void {
    this.metadataService.getLocal('./assets/login.json').subscribe((data) => {
      this.componentLoaderService.parseData(data, this.container);
      // this.contextService.addToContext('baseContainerRef', this.container);
    }, (error) => {
      console.log(error);
    });
  }

}
