import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
 // Observable sources of type Map
 private contextSubject: BehaviorSubject<Map<string, any>>;
 private screenSubject: BehaviorSubject<Map<string, any>>;
 private screenObj: {};
 public isDataRefreshed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 // Observable streams of type Map
 // readonly contextSubject$ = this.contextSubject.asObservable();

 constructor() {
   this.screenObj = [],

     this.contextSubject = new BehaviorSubject(new Map<string,
       any>());
   // this.screenSubject = new BehaviorSubject(new Map<string,
   //   any>());
     this.screenSubject = new BehaviorSubject(new Map<string,
       any>());
 }

 /// Adds data to respective key in the context
 addToContext(key, data) {
   let screenName = this.contextSubject.getValue().get("currentWC");
   if (screenName) {
     let screenObj = this.contextSubject.getValue().get(screenName);
     if(screenObj!==undefined){
       screenObj = screenObj.set(key, data)
     }else{
       screenObj = new Map();
       screenObj = screenObj.set(key, data)
     }
     this.contextSubject.next(this.contextSubject.getValue().set(screenName, screenObj));
   } else {
     this.contextSubject.next(this.contextSubject.getValue().set(key, data));
   }
 }

 deleteContext() {
   this.screenSubject.next(new Map<string,any>());
   // this.screenSubject.next(new Map<string, any>());
 }
  
 deleteScreenContext() { 
   this.screenSubject.next(new Map<string, any>()); 
 }

 deleteTotalContext() {
   this.contextSubject.next(new Map<string,
     any>());
 }

 /// Returns the data from context based on [key]
 getDataByKey(key) {
   let screenName = this.contextSubject.getValue().get("currentWC");
   if (screenName && key !== "undefied") {
     let data = this.contextSubject.getValue().get(screenName);
     if (data == undefined) {
       return this.contextSubject.getValue().get(key);
     } else {
       if (data.get(key) !== undefined) {
         return data.get(key);
       } else if (this.contextSubject.getValue().get(key) !== undefined) {
         return this.contextSubject.getValue().get(key);
       } else {
         let MenuData = this.contextSubject.getValue().get("menuItems");
         let seletedData;
         MenuData && MenuData.map((data) => {
           if (data.name !== screenName && data.completed) {
             var textData = this.contextSubject.getValue().get(data.name)
             if(textData && textData.get(key) !== undefined && textData.get(key) ){
               seletedData= textData.get(key)
             }
           }
         })
         return seletedData;
       }
     }
   } else {
     return this.contextSubject.getValue().get(key);
   }
 }

 getDataByString(inputString: string) {
   const splitArray = inputString.split('.');
   const contextKey = splitArray.shift().split('#')[1];
   const resultByKey = this.getDataByKey(contextKey);

   if (splitArray.length > 0) {
     /// for traversing further
     const searchString = splitArray.join('.');
     return this.getObjectFromString(resultByKey, searchString);
   }

   return resultByKey === undefined ? '' : resultByKey;
 }
 getObjectFromString(obj, key) {
   return key.split(".").reduce(function (result, key) {
     if (result) {
       if (key.indexOf('[') > 0) {
         var keyList = "";
         keyList = result[key.split("[")[0]];
         var index = 0;
         index = (key.split("[")[1]).substr(0, 1);
         return keyList[index];
       } else {
         return result[key]
       }
     }
   }, obj);
 }



 getParsedObject(jsonObject, utilityService) {
   if (jsonObject != undefined && Object.keys(jsonObject).length > 0) {
     Object.keys(jsonObject).forEach(key => {

       // check if nested object 
       if (jsonObject[key] != null && typeof jsonObject[key] === 'object') {
         this.getParsedObject(jsonObject[key], utilityService);
         return;
       }
       const keyValue = jsonObject[key];
       const keyIndex = key;
       if (utilityService.isString(keyValue) && keyValue.startsWith('#')) {
         let reqValue = this.getDataByString(keyValue);
         if (utilityService.isString(reqValue)) {
           reqValue = reqValue.trim();
         }
         jsonObject[key] = reqValue;
       }

       /// check if key contains #
       if (utilityService.isString(keyIndex) && keyIndex.startsWith('#')) {
         let reqValue = this.getDataByString(keyIndex);
         if (utilityService.isString(reqValue)) {
           reqValue = reqValue.trim();
         }
         jsonObject[reqValue] = jsonObject[key];
         delete jsonObject[keyIndex];
       }
     });
   }
   return jsonObject;
 }

 addToExistingContext(action, instance, responseData, utilityService) {
   var sourceContextData: any[] = this.getDataByKey(action.config.target);

   /// Parse the input source data so that if it has any context values
   ///let parsedArrayItem = Object.assign({}, action.config.sourceData);
   /// parsedArrayItem = this.getParsedObject(parsedArrayItem);
   var sourceData = this.getParsedObject(action.config.sourceData, utilityService);

   //If input data is an array
   if (sourceData != null && typeof (sourceData) == "object" && sourceData.length != undefined) {
     sourceData.forEach(arrayItem => {
       var value = arrayItem.Value;
       if (utilityService.isString(value) && value.startsWith('#')) {
         arrayItem.Value = this.getDataByString(value);
       }
       if (sourceContextData === undefined) {
         this.addToContext(action.config.target, []);
         sourceContextData = this.getDataByKey(action.config.target);
         sourceContextData.push(arrayItem);
       } else {
         var isMatchFound: boolean = false;
         sourceContextData.forEach(element => {
           if (element.Name === arrayItem.Name) {
             element.Value = arrayItem.Value;
             isMatchFound = true;
           }
         });
         if (!isMatchFound) {
           sourceContextData.push(arrayItem);
         }
       }
     });
   } else {
     //if input is an single object notation
     var sourceDataString = action.config.sourceData.Value;
     if (utilityService.isString(sourceDataString) && sourceDataString.startsWith('#')) {
       action.config.sourceData.Value = this.getDataByString(sourceDataString);
     }
     if (sourceContextData === undefined) {
       this.addToContext(action.config.target, []);
       sourceContextData = this.getDataByKey(action.config.target);
       sourceContextData.push(sourceData);
     } else {
       var isMatchFound: boolean = false;
       sourceContextData.forEach(element => {
         if (element.Name !== undefined && (element.Name === action.config.sourceData.Name)) {
           element.Value = action.config.sourceData.Value;
           isMatchFound = true;
         }
       });
       if (!isMatchFound) {
         sourceContextData.push(sourceData);
       }
     }
   }

 }

 updateToExistingContext(action, instance, responseData) {
   var sourceContextData: any[] = this.getDataByKey(action.config.target);
   if (sourceContextData === undefined) {
     this.addToContext(action.config.target, []);
     sourceContextData = this.getDataByKey(action.config.target);
     sourceContextData.push(action.config.sourceData);
   } else {
     sourceContextData.forEach(element => {
       if (element.Name === action.config.sourceData.Name) {
         element.Value = action.config.sourceData.Value;
       }
     });
   }
 }


 deleteDataByKey(key) {
   let screenName = this.contextSubject.getValue().get("currentWC");

   if (this.contextSubject.getValue().get(key)) {
     return this.contextSubject.getValue().delete(key);
   }
   else if (screenName) {
     let data = this.contextSubject.getValue().get(screenName);
     if (data == undefined) {
       return this.contextSubject.getValue().delete(key);
     } else {
       if (data.get(key) == undefined) {
         return this.contextSubject.getValue().delete(key);
       }
       else {
         return data.delete(key);
       }
     }
   }
 }

 popContext(key) {
   return this.contextSubject.getValue().get(key).pop();
 }
 contextSubjectData(key, data) {
   return this.contextSubject.getValue().set(key, data);
 }

 //method for expnad current task panel and collapsed other panels from the screen 
 collapseAllfromContext(header) {
   let Currentscreen = this.contextSubject.getValue().get("currentWC");
   let CurrentscreenObj = this.contextSubject.getValue().get(Currentscreen);
   CurrentscreenObj.forEach((r) => {
     if (r && r.instance && (r.instance.ctype === "taskPanel")) {
       // setTimeout(() => {
       if (r.instance.disabled == false || r.instance.disabled == undefined) {
         if (Object.is(header, r.instance.header)) {
           if (header.class && header.statusClass != "complete-status") {
             r.instance.expanded = true;
             r.instance._changeDetectionRef.detectChanges();
           }
         } else {
           if (r.instance.isKeepExpanded != undefined && r.instance.isKeepExpanded != null) {
             if (r.instance.isKeepExpanded == true || r.instance.isKeepExpanded == "true") {

             } else {
               r.instance.expanded = false;
               r.instance._changeDetectionRef.detectChanges();
             }
           } else {
             r.instance.expanded = false;
             r.instance._changeDetectionRef.detectChanges();
           }
         }
       }
       // },200);
     }
   });
 }

 collapseTaskPanel() {
   let currentTaskPanel = this.getDataByKey("currentTaskPanelUUID");
   let currentTaskPanelRef = this.getDataByKey(currentTaskPanel + "ref");
   if (currentTaskPanelRef != undefined && currentTaskPanelRef.instance.header) {
     if (currentTaskPanelRef.instance.header.statusClass != "complete-status") {
       currentTaskPanelRef.instance.expanded = true;
       currentTaskPanelRef.instance._changeDetectionRef.detectChanges();
     }
     this.collapseAllfromContext(currentTaskPanelRef.instance.header);
   }
 }

 screenSubjectData(key, data) {
   return this.screenSubject.getValue().set(key, data);
 }
}
