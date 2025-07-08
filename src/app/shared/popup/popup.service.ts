import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Type } from '@angular/core';
import { PopupComponent } from './popup.component';

export interface PopupConfig {
  title?: string;
  content?: string | Type<any>;
  showCloseButton?: boolean;
  showFooter?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  closeOnOverlayClick?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupComponentRef: ComponentRef<PopupComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Open a popup with the given configuration
   */
  open(config: PopupConfig): Promise<boolean> {
    // Close any existing popup
    this.close();

    return new Promise<boolean>((resolve) => {
      // Create component
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
      this.popupComponentRef = componentFactory.create(this.injector);
      
      // Set properties from config
      const instance = this.popupComponentRef.instance;
      instance.title = config.title || '';
      instance.showCloseButton = config.showCloseButton !== undefined ? config.showCloseButton : true;
      instance.showFooter = config.showFooter !== undefined ? config.showFooter : true;
      instance.showCancelButton = config.showCancelButton !== undefined ? config.showCancelButton : true;
      instance.showConfirmButton = config.showConfirmButton !== undefined ? config.showConfirmButton : true;
      instance.cancelText = config.cancelText || 'Cancel';
      instance.confirmText = config.confirmText || 'Confirm';
      instance.closeOnOverlayClick = config.closeOnOverlayClick !== undefined ? config.closeOnOverlayClick : true;
      instance.size = config.size || 'md';
      instance.isOpen = true;
      
      // Handle events
      instance.confirmed.subscribe(() => {
        resolve(true);
        this.close();
      });
      
      instance.cancelled.subscribe(() => {
        resolve(false);
        this.close();
      });
      
      instance.closed.subscribe(() => {
        resolve(false);
        this.close();
      });
      
      // Attach to DOM
      this.appRef.attachView(this.popupComponentRef.hostView);
      const domElem = (this.popupComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
      document.body.appendChild(domElem);
    });
  }

  /**
   * Open a confirmation popup
   */
  confirm(message: string, title: string = 'Confirm'): Promise<boolean> {
    return this.open({
      title: title,
      content: message,
      showCancelButton: true,
      showConfirmButton: true,
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      size: 'sm'
    });
  }

  /**
   * Open an alert popup
   */
  alert(message: string, title: string = 'Alert'): Promise<boolean> {
    return this.open({
      title: title,
      content: message,
      showCancelButton: false,
      showConfirmButton: true,
      confirmText: 'OK',
      size: 'sm'
    });
  }

  /**
   * Close the popup if it's open
   */
  close(): void {
    if (this.popupComponentRef) {
      this.appRef.detachView(this.popupComponentRef.hostView);
      this.popupComponentRef.destroy();
      this.popupComponentRef = null;
      document.body.style.overflow = 'auto';
    }
  }
}