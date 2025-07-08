import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Input() showCloseButton: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() showCancelButton: boolean = true;
  @Input() showConfirmButton: boolean = true;
  @Input() cancelText: string = 'Cancel';
  @Input() confirmText: string = 'Confirm';
  @Input() closeOnOverlayClick: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' | 'fullscreen' = 'md';
  
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  get popupClass(): string {
    return `popup-${this.size}`;
  }
  
  constructor() { }

  ngOnInit(): void {
    // Add event listener to prevent scrolling of the body when popup is open
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  open(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
    this.closed.emit();
  }

  onConfirm(): void {
    this.confirmed.emit();
    if (this.closeOnOverlayClick) {
      this.close();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
    this.close();
  }
}