export interface Lane {
  laneNumber: string;
  equipment: string;
  origin: {
    city: string;
    state: string;
    zip: string;
  };
  destination: {
    city: string;
    state: string;
    zip: string;
  };
  days: string[];
  pickupwindow: {
    start: string;
    end: string;
  };
  deliverywindow: {
    start: string;
    end: string;
  };
  weeklyFrequency: number;
  minMonthlyFrequency: number;
  maxWeight: number;
  originRadius: number;
  destinationRadius: number;
  specialEquipment: string[];
  dispatchName: string;
  dispatchEmail: string;
  minAutoAccept: number;
  seasonality: {
    months: string[];
  };
  holidayExclusions: {
    start: string;
    end: string;
  }[];
}
