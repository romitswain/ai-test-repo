export interface Load {
  id: string;
  pfnzNumber: string;
  loadId: string;
  equipment: string;
  origin: string;
  destination: string;
  pickupDate: string;
  weight: number;
  commodity: string;
  timesPerYear: number;
  submittedDate: string;
  submittedTime: string;
  offeredPrice: number;
  specialInstructions?: string;
  pickupWindowStart: string;
  pickupWindowEnd: string;
  deliveryWindowStart: string;
  deliveryWindowEnd: string;
  dropAndHook: boolean;
  specialEquipment: string[];
  responseDeadline: string;
}
