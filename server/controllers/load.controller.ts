import { Request, Response } from 'express';
import { createObjectCsvStringifier } from 'csv-writer';

// Mock data - replace with actual database queries in production
const mockLoads = [
  {
    id: '1',
    pfnzNumber: 'PFNZ-001',
    loadId: 'LD12345',
    equipment: 'Dry Van',
    origin: 'Chicago, IL 60601',
    destination: 'Dallas, TX 75201',
    pickupDate: '2023-07-15',
    weight: 15000,
    commodity: 'Electronics',
    timesPerYear: 12,
    submittedDate: '2023-07-01',
    submittedTime: '14:30',
    offeredPrice: 1850,
    specialInstructions: 'Handle with care',
    pickupWindowStart: '2023-07-15T08:00',
    pickupWindowEnd: '2023-07-15T12:00',
    deliveryWindowStart: '2023-07-17T09:00',
    deliveryWindowEnd: '2023-07-17T17:00',
    dropAndHook: true,
    specialEquipment: ['Liftgate'],
    responseDeadline: '2023-07-05T17:00'
  },
  {
    id: '2',
    pfnzNumber: 'PFNZ-002',
    loadId: 'LD67890',
    equipment: 'Refrigerated',
    origin: 'Miami, FL 33101',
    destination: 'Atlanta, GA 30301',
    pickupDate: '2023-07-18',
    weight: 22000,
    commodity: 'Produce',
    timesPerYear: 52,
    submittedDate: '2023-07-02',
    submittedTime: '09:15',
    offeredPrice: 2100,
    specialInstructions: 'Maintain temperature at 34°F',
    pickupWindowStart: '2023-07-18T06:00',
    pickupWindowEnd: '2023-07-18T10:00',
    deliveryWindowStart: '2023-07-19T07:00',
    deliveryWindowEnd: '2023-07-19T14:00',
    dropAndHook: false,
    specialEquipment: ['Pallet Jack'],
    responseDeadline: '2023-07-10T17:00'
  }
];

export const getLoads = (req: Request, res: Response) => {
  // In a real app, fetch from database
  res.status(200).json(mockLoads);
};

export const exportLoadsCSV = (req: Request, res: Response) => {
  try {
    // Define CSV header
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'pfnzNumber', title: 'PFNZ Number' },
        { id: 'loadId', title: 'Load ID Number' },
        { id: 'equipment', title: 'Equipment' },
        { id: 'origin', title: 'Origin (City, State, Zip)' },
        { id: 'destination', title: 'Destination (City, State, Zip)' },
        { id: 'pickupDate', title: 'Pickup Date' },
        { id: 'weight', title: 'Shipment Weight' },
        { id: 'commodity', title: 'Commodity Shipped' },
        { id: 'timesPerYear', title: 'Number of Times a Year' },
        { id: 'submittedDate', title: 'Submitted Date' },
        { id: 'submittedTime', title: 'Submitted Time' },
        { id: 'offeredPrice', title: 'Offered Price' },
        { id: 'specialInstructions', title: 'Special Instructions' },
        { id: 'pickupWindowStart', title: 'Pickup Window Start' },
        { id: 'pickupWindowEnd', title: 'Pickup Window End' },
        { id: 'deliveryWindowStart', title: 'Delivery Window Start' },
        { id: 'deliveryWindowEnd', title: 'Delivery Window End' },
        { id: 'dropAndHook', title: 'Drop & Hook' },
        { id: 'specialEquipment', title: 'Special Equipment' },
        { id: 'responseDeadline', title: 'Response Deadline' }
      ]
    });

    // Format data for CSV
    const formattedLoads = mockLoads.map(load => ({
      ...load,
      specialEquipment: load.specialEquipment.join(', ')
    }));

    // Generate CSV content
    const csvHeader = csvStringifier.getHeaderString();
    const csvRecords = csvStringifier.stringifyRecords(formattedLoads);
    const csvContent = csvHeader + csvRecords;

    // Set response headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=loads-export-${new Date().toISOString().split('T')[0]}.csv`);
    
    // Send CSV content
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error generating CSV:', error);
    res.status(500).json({ message: 'Failed to generate CSV file' });
  }
};
