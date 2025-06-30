export interface BuyerRegistration {
  // Business Information
  businessName: string;
  mcNumber?: string;
  businessWebsite: string;
  userAgreement: boolean;
  
  // Administrator Information
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  
  // Credit Card Information
  cardNumber: string;
  expirationDate: string;
  zipCode: string;
  cvv: string;
  useCardForMatchingFees: boolean;
  
  // Additional Information
  truckloadTms: string;
  teamSize: number;
  establishedYear: number;
  paymentTerms?: string;
  spotDiscount?: number;
  repetitiveDiscount?: number;
}
