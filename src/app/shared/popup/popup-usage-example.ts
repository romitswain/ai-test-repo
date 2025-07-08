import { Component } from '@angular/core';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup-example',
  template: `
    <div class="example-container">
      <h2>Popup Examples</h2>
      
      <div class="button-group">
        <button (click)="openBasicPopup()">Basic Popup</button>
        <button (click)="openConfirmPopup()">Confirmation Popup</button>
        <button (click)="openAlertPopup()">Alert Popup</button>
        <button (click)="openCustomSizedPopup('sm')">Small Popup</button>
        <button (click)="openCustomSizedPopup('lg')">Large Popup</button>
        <button (click)="openCustomSizedPopup('fullscreen')">Fullscreen Popup</button>
      </div>
      
      <!-- Basic popup template -->
      <ng-template #popupContent>
        <p>This is custom content inside the popup. You can put any HTML here.</p>
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email">
          </div>
        </form>
      </ng-template>
    </div>
  `,
  styles: [`
    .example-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    button {
      padding: 10px 15px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #43a047;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class PopupExampleComponent {
  constructor(private popupService: PopupService) {}

  openBasicPopup(): void {
    this.popupService.open({
      title: 'Basic Popup',
      content: 'This is a basic popup with default settings.',
      confirmText: 'Save',
      cancelText: 'Discard'
    });
  }

  openConfirmPopup(): void {
    this.popupService.confirm('Are you sure you want to delete this item?')
      .then(result => {
        if (result) {
          console.log('User confirmed');
          // Perform action on confirmation
        } else {
          console.log('User cancelled');
          // Handle cancellation
        }
      });
  }

  openAlertPopup(): void {
    this.popupService.alert('Your changes have been saved successfully!')
      .then(() => {
        console.log('Alert acknowledged');
      });
  }

  openCustomSizedPopup(size: 'sm' | 'md' | 'lg' | 'fullscreen'): void {
    this.popupService.open({
      title: `${size.toUpperCase()} Sized Popup`,
      content: `This is a ${size} sized popup example.`,
      size: size
    });
  }
}