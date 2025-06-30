import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  showSignaturePopup = false;
  signatureComplete = false;
  signatureImageData = '';

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      // Business Information
      businessName: ['', [Validators.required, Validators.maxLength(100)]],
      mcNumber: ['', [Validators.maxLength(12)]],
      businessWebsite: ['', [Validators.required, Validators.maxLength(200), this.urlValidator]],
      userAgreement: [false, [Validators.requiredTrue]],
      
      // Administrator Information
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      confirmEmail: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(20), this.passwordValidator]],
      
      // Credit Card Information
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirationDate: ['', [Validators.required, this.expirationDateValidator]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      useCardForMatchingFees: [true],
      
      // Additional Information
      truckloadTms: ['', [Validators.required, Validators.maxLength(50)]],
      teamSize: [0, [Validators.required, Validators.min(0)]],
      establishedYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      paymentTerms: ['Net 30', [Validators.maxLength(20)]],
      spotDiscount: [10, [Validators.min(0), Validators.max(40)]],
      repetitiveDiscount: [30, [Validators.min(0), Validators.max(60)]]
    }, {
      validators: this.emailMatchValidator
    });
  }

  // Custom validator for password
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    // At least 6 characters, 2 unique characters, a number and a character
    const hasMinLength = value.length >= 6;
    const hasNumber = /\d/.test(value);
    const hasCharacter = /[a-zA-Z]/.test(value);
    
    // Check for 2 unique characters
    const uniqueChars = new Set(value.split(''));
    const hasUniqueChars = uniqueChars.size >= 2;
    
    if (hasMinLength && hasNumber && hasCharacter && hasUniqueChars) {
      return null;
    }
    
    return { invalidPassword: true };
  }
  
  // Custom validator for URL
  urlValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    try {
      new URL(control.value);
      return null;
    } catch (_) {
      return { invalidUrl: true };
    }
  }
  
  // Custom validator for expiration date (MM/YY format)
  expirationDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const value = control.value;
    if (!/^\d{2}\/\d{2}$/.test(value)) {
      return { invalidFormat: true };
    }
    
    const [month, year] = value.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10) + 2000; // Convert YY to 20YY
    
    if (monthNum < 1 || monthNum > 12) {
      return { invalidMonth: true };
    }
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return { expired: true };
    }
    
    return null;
  }
  
  // Custom validator to check if emails match
  emailMatchValidator(group: FormGroup): ValidationErrors | null {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    
    return email === confirmEmail ? null : { emailMismatch: true };
  }
  
  // Check if discount values exceed maximum allowed
  checkDiscountValues(): void {
    const spotDiscount = this.registrationForm.get('spotDiscount')?.value;
    const repetitiveDiscount = this.registrationForm.get('repetitiveDiscount')?.value;
    
    if (spotDiscount > 40) {
      this.registrationForm.get('spotDiscount')?.setErrors({ exceedsMaximum: true });
    }
    
    if (repetitiveDiscount > 60) {
      this.registrationForm.get('repetitiveDiscount')?.setErrors({ exceedsMaximum: true });
    }
  }

  openSignaturePopup(): void {
    this.showSignaturePopup = true;
  }

  closeSignaturePopup(): void {
    this.showSignaturePopup = false;
  }

  completeSignature(signatureData: string): void {
    this.signatureImageData = signatureData;
    this.signatureComplete = true;
    this.registrationForm.get('userAgreement')?.setValue(true);
    this.closeSignaturePopup();
  }

  downloadAgreement(): void {
    // Logic to download the agreement as PDF
    console.log('Downloading agreement...');
  }

  onSubmit(): void {
    this.checkDiscountValues();
    
    if (this.registrationForm.valid) {
      console.log('Registration form submitted:', this.registrationForm.value);
      // Here you would send the data to your backend
      // After successful registration, trigger email notification
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
