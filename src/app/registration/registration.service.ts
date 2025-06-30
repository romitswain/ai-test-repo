import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuyerRegistration } from './buyer-registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'api/registration'; // Replace with actual API endpoint

  constructor(private http: HttpClient) { }

  /**
   * Register a new buyer
   * @param buyerData The buyer registration data
   * @returns Observable with the registration response
   */
  registerBuyer(buyerData: BuyerRegistration): Observable<any> {
    return this.http.post(`${this.apiUrl}/buyer`, buyerData);
  }

  /**
   * Validate credit card information
   * @param cardData Credit card data to validate
   * @returns Observable with validation response
   */
  validateCreditCard(cardData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate-card`, cardData);
  }

  /**
   * Download user agreement
   * @returns Observable with the PDF document
   */
  downloadAgreement(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/agreement`, {
      responseType: 'blob'
    });
  }

  /**
   * Submit signed agreement
   * @param signatureData The signature data
   * @returns Observable with the submission response
   */
  submitSignedAgreement(signatureData: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-agreement`, { signature: signatureData });
  }
}
