import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appPopupContent]'
})
export class PopupContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}