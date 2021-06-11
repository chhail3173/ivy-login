import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input() submitable: boolean;
  @Input() disabled: boolean;
  @Input() visibility: boolean;
  @Input() validations: any[];
  @Input() labelstyles: string;
  @Input() inputStyles: string;
  @Input() hooks: any[];
  @Input() actions: any[];
  @Input() name: string;
  @Input() label: string;
  @Input() labelPosition: string;
  @Input() tooltip: string;
  @Input() TooltipPosition: string;
  @Input() defaultvalue: string;
  @Input() readonly: boolean;
  @Input() type: string;
  @Input() required: boolean;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() errorStateMatcher: string;
  @Input() revealpassword: boolean;
  @Input() footerActions: any[];
  @Input() labelIcon:any = false;

  @Input() group: FormGroup;
  eventMap = ['keyup', 'focus', 'blur', 'onfocusout', 'keydown', 'onchange', 'click'];
  hookMap = ['beforeAction', 'afterAction', 'beforeInit', 'afterInit'];
  // inject event processor service
  constructor(
    ) { 
      let language = localStorage.getItem('language');
    //  translate.setDefaultLang(language);
     // translate.use(language)
    }
  ngOnInit(): void {
    // check for beforeinit hook if exists call
    // componentspecific logic
    // check for afterinit hook if exists call
  }

  onlocalfocus(event) {
    //this.logger.log();
    // any custome logic
    // this.eventprocessor.handleEvent(event)
  }

  onlocalChange(event) {
  }

  onKeyup(event) {
    const eventType = { type: event.type };
    if (this.group.status === 'VALID') {
      /// Treat enter key as click
      if (event.keyCode === 13) {
        eventType.type = 'click';
        if (this.footerActions && this.footerActions.length > 0) {
          this.eventMap.forEach((ele) => {
            if (ele === eventType.type) {
            //  this.eventService.handleEvent(this, eventType, true);
            }
          });
        }
      } else {
        this.eventMap.forEach((ele) => {
          if (ele === event.type) {
           // this.eventService.handleEvent(this, eventType);
          }
        });
      }
    }
  }

  onlocalBlur(event) {
  }

  onlocalFocusOut(event) {
  }

  onKeyDown(event) {
  }

  revealPasswordClick(event) {
    this.revealpassword = !this.revealpassword;
  }

}
