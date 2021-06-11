import { Injectable } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { FormPanelComponent } from './form-panel/form-panel.component';
import { ImageComponent } from './image/image.component';
import { PasswordComponent } from './password/password.component';
import { TextFieldComponent } from './text-field/text-field.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentHelperService {

  constructor() { }

  determineComponent(componentType: string) {
    switch (componentType) {
      case 'formPanel':
        return FormPanelComponent;
      case 'textField':
        return TextFieldComponent;
      case 'passwordField':
        return PasswordComponent;
      case 'button':
        return ButtonComponent;
      case 'image':
        return ImageComponent;
        break;
    }
    return true;
  }
}
