import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  eventMap = ['click'];
  hookMap = ['beforeInit', 'afterInit', 'beforeAction', 'afterAction'];

  @Input() disableRipple: boolean;
  @Input() color: string;
  @Input() isIconButton: boolean;
  @Input() isRoundButton: boolean;
  @Input() ripple: string;
  @Input() type: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() submitable: boolean;
  @Input() visibility: boolean;
  @Input() uuid: any;
  @Input() show: boolean;
  @Input() hooks: string[] = [];
  @Input() actions: string[];
  @Input() validations: string[];
  @Input() labelstyles: string;
  @Input() inputStyles: string;
  @Input() text: string;
  @Input() class: string;
  @Input() group: FormGroup = new FormGroup({});
  @Input() hidden: boolean;
  @Input() tooltip: string;
  @Input() ctype: string;
  @Input() toolTipPosition: string;
  @Input() buttonClass: string;
  @Input() dialogButton: boolean;
  @Input() closeType: string;
  @Input() disableClose: boolean;
  @Input() checkGroupValidity: boolean;
  @Input() nestedFormGroup: string;
  @Input() inputClass;
  @Input() setDisabled: any;
  @Input() isIcon: boolean;
  @Input() icon: any;
  @Input() iconClass: string;
  @Input() iconPosition: 'before' | 'after' = 'after';
  @Input() iconcss: string;
  @Input() isDisableNotReq: boolean;
  beforeInitHooks: any[];
  afterInitHooks: any[];
  beforeActionHooks: any[];
  afterActionHooks: any[];

  constructor(
    private _changeDetectionRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    // let ScreenMenuObj = this.contextService.getDataByKey("ScreenMenuObj");
    this.visibility = this.visibility !== undefined ? this.visibility : true;
    this.isIcon = this.isIcon !== undefined ? this.isIcon : false;
    /// Default tooltip position
    this.toolTipPosition = this.toolTipPosition === undefined ? 'above' : this.toolTipPosition;
    this.beforeInitHooks = this.hooks.filter((x: any) => x.hookType === this.hookMap[0]);
    this.afterInitHooks = this.hooks.filter((x: any) => x.hookType === this.hookMap[1]);
    this.beforeActionHooks = this.hooks.filter((x: any) => x.hookType === this.hookMap[2]);
    this.afterActionHooks = this.hooks.filter((x: any) => x.hookType === this.hookMap[3]);
    // this.hookService.handleHook(this.beforeInitHooks, this);

    this.checkGroupValidity = this.checkGroupValidity === undefined ? true : this.checkGroupValidity;
    this.visibility = this.visibility !== undefined ? this.visibility : true;

    if (this.setDisabled) {
      const setDisabled = this.setDisabled;
      // let data: any = this.actionService.getContextorNormalData(setDisabled.lhs, "");
      // let isConditionValid = this.actionService.isConditionValid({ lhs: data, rhs: setDisabled.rhs, operation: setDisabled.operation }, this);

      // if (isConditionValid) {
      //   this.disabled = true;
      //   this.checkGroupValidity = false;
      // }
    }
    // if (ScreenMenuObj && ScreenMenuObj.completed) {
    //   this.disabled = true;
    // }
    if (this.checkGroupValidity !== undefined && this.checkGroupValidity) {
      this.group.valueChanges.subscribe(() => {
        if (!this.nestedFormGroup || this.nestedFormGroup === undefined) {
          this.disabled = this.group.status === 'VALID' ? false : true;
          this._changeDetectionRef.detectChanges();
        }
      });
    }
  }

  ngAfterViewInit() {
    if (this.hooks !== undefined && this.hooks != null && this.hooks.length > 0) {
      this.afterInitHooks = this.hooks.filter((x: any) => x.hookType === this.hookMap[1]);
      // this.hookService.handleHook(this.afterInitHooks, this);
    }
  }

  onClickButton(event) {
    // this.hookService.handleHook(this.beforeActionHooks, this);
    this.eventMap.forEach((ele) => {
      if (ele === event.type) {
        // let WC = this.contextService.getDataByKey("currentWC");
        // let discrepancyUnitInfo = this.contextService.getDataByKey("discrepancyUnitInfo");
        // if (discrepancyUnitInfo&&discrepancyUnitInfo.CLIENTNAME=="HP") {

        //   this.actions.forEach((data) => {
        //     let uuid = {};
        //     if (data["config"] && data["config"].properties && data["config"].properties.expanded == false) {
        //       this.contextService.addToContext(data["config"].key, data["config"].properties);
        //     } else if (data["config"] && data["config"].data == "formData") {
        //       Object.keys(this.group.controls).forEach((key) => {
        //         let text = {};
        //         if (key !== "undefined") {
        //           let data = this.contextService.getDataByKey(key);
        //           if (data && data.ctype=="radioButtonGroup") {
        //             text = {
        //               "name": key,
        //               "ctype": data.ctype,
        //               "uuid": data.uuid,
        //               "isTaskDone": this.isDisableNotReq ? false : true,
        //               "value": data.value,
        //               "disabled": this.group.controls[key].disabled
        //             }
        //             this.contextService.addToContext(data.uuid, text);
        //           }
        //           else if (data) {
        //             text = {
        //               "name": key,
        //               "ctype": data.ctype,
        //               "uuid": data.uuid,
        //               "isTaskDone": this.isDisableNotReq ? false : true,
        //               "value": this.group.controls[key].value,
        //               "disabled": this.group.controls[key].disabled
        //             }
        //             this.contextService.addToContext(data.uuid, text);
        //           }
        //         }})
        //     } else if (data["config"] && this.uuid == data["config"].key) {
        //       uuid = {
        //         "ctype": "button",
        //         "disabled": true
        //       }
        //       this.contextService.addToContext(this.uuid, uuid);
        //     }
        //   })
        // }
        if (this.text == "Next") {
            // this.contextActionSevice.clearScreenData(this.actionService,this.text);
        }
        // this.eventprocessor.handleEvent(this, event);
      }
    });
  }

  ngOnChanges() {
    if (this.name === "rupiSubmit" && !this.disabled) {
    }
  }
}
