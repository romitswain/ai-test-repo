import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrierReportService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAvailableRegions(): Observable<{regions: string[], hasUnlabeledRegions: boolean}> {
    // In a real application, this would call an API endpoint
    // For demo purposes, we're returning mock data
    return of({
      regions: ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'],
      hasUnlabeledRegions: true
    });
  }

  generateReport(params: {startDate: string, endDate: string, region: string}): Observable<any> {
    // In a real application, this would call an API endpoint with the parameters
    // const url = `${this.apiUrl}/carrier-report`;
    // return this.http.post(url, params);
    
    // For demo purposes, we're returning mock data
    return of(this.getMockReportData(params));
  }

  private getMockReportData(params: {startDate: string, endDate: string, region: string}): any {
    // Generate some realistic mock data based on the parameters
    const startDate = new Date(params.startDate);
    const endDate = new Date(params.endDate);
    
    // Calculate number of days in the date range
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Generate metrics
    const loadsOffered = Math.floor(daysDiff * 2.5) + 10;
    const loadsOpened = Math.floor(loadsOffered * 0.75);
    const loadsAcceptedOrCountered = Math.floor(loadsOffered * 0.5);
    const loadsHauled = Math.floor(loadsOffered * 0.35);
    
    // Generate loads data
    const loads = this.generateMockLoads(startDate, endDate, loadsHauled);
    
    return {
      metrics: {
        loadsOffered,
        loadsOpened,
        loadsOpenedPercentage: Math.round((loadsOpened / loadsOffered) * 100),
        loadsAcceptedOrCountered,
        loadsAcceptedOrCounteredPercentage: Math.round((loadsAcceptedOrCountered / loadsOffered) * 100),
        loadsHauled,
        loadsHauledPercentage: Math.round((loadsHauled / loadsOffered) * 100)
      },
      loads
    };
  }

  private generateMockLoads(startDate: Date, endDate: Date, count: number): any[] {
    const loads = [];
    const dateRange = endDate.getTime() - startDate.getTime();
    
    for (let i = 0; i < count; i++) {
      // Generate random dates within the range
      const submitDateOffset = Math.random() * dateRange;
      const submitDate = new Date(startDate.getTime() + submitDateOffset);
      
      // Pickup date is 1-3 days after submit date
      const pickupDateOffset = (1 + Math.floor(Math.random() * 3)) * 24 * 60 * 60 * 1000;
      const pickupDate = new Date(submitDate.getTime() + pickupDateOffset);
      
      // Generate random values for other fields
      const miles = 100 + Math.floor(Math.random() * 900);
      const pricePaid = 500 + Math.floor(Math.random() * 2500);
      const pricePerMile = +(pricePaid / miles).toFixed(2);
      const co2TonsSaved = +(Math.random() * 2).toFixed(2);
      const treeEquivalentSaved = Math.floor(co2TonsSaved * 15);
      
      loads.push({
        loadNumber: `L-${100000 + i}`,
        submitDate,
        pickupDate,
        pricePaid,
        pricePerMile,
        miles,
        co2TonsSaved,
        treeEquivalentSaved
      });
    }
    
    // Sort by pickup date
    return loads.sort((a, b) => a.pickupDate.getTime() - b.pickupDate.getTime());
  }
}
