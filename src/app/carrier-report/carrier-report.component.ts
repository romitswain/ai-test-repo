import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrierReportService } from '../services/carrier-report.service';

@Component({
  selector: 'app-carrier-report',
  templateUrl: './carrier-report.component.html',
  styleUrls: ['./carrier-report.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CarrierReportComponent implements OnInit {
  // Time frame selection
  selectedTimeFrame: string = 'thisMonthToDate';
  startDate: string = '';
  endDate: string = '';
  
  // Region selection
  selectedRegion: string = 'all';
  availableRegions: string[] = [];
  hasUnlabeledRegions: boolean = false;
  displayRegion: string = 'All';
  
  // Report data
  reportGenerated: boolean = false;
  formattedDateRange: string = '';
  
  // Metrics
  metrics = {
    loadsOffered: 0,
    loadsOpened: 0,
    loadsOpenedPercentage: 0,
    loadsAcceptedOrCountered: 0,
    loadsAcceptedOrCounteredPercentage: 0,
    loadsHauled: 0,
    loadsHauledPercentage: 0
  };
  
  // Loads data
  loads: any[] = [];
  
  // Summary data
  summary = {
    totalRevenue: 0,
    totalCO2TonsSaved: 0,
    totalTreeEquivalentSaved: 0
  };

  constructor(private carrierReportService: CarrierReportService) {}

  ngOnInit(): void {
    this.loadRegions();
    this.setDefaultDates();
  }

  loadRegions(): void {
    this.carrierReportService.getAvailableRegions().subscribe(response => {
      this.availableRegions = response.regions;
      this.hasUnlabeledRegions = response.hasUnlabeledRegions;
    });
  }

  setDefaultDates(): void {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    this.startDate = this.formatDateForInput(thirtyDaysAgo);
    this.endDate = this.formatDateForInput(today);
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onTimeFrameChange(): void {
    if (this.selectedTimeFrame !== 'custom') {
      // Reset custom dates if not in custom mode
      this.setDateRangeFromTimeFrame();
    }
  }

  setDateRangeFromTimeFrame(): void {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (this.selectedTimeFrame) {
      case 'today':
        // Start and end are both today
        break;
      case 'yesterday':
        start.setDate(today.getDate() - 1);
        end = new Date(start);
        break;
      case 'thisWeekToDate':
        start.setDate(today.getDate() - today.getDay());
        break;
      case 'thisMonthToDate':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'thisQuarterToDate':
        const quarter = Math.floor(today.getMonth() / 3);
        start = new Date(today.getFullYear(), quarter * 3, 1);
        break;
      case 'thisYear':
        start = new Date(today.getFullYear(), 0, 1);
        break;
      case 'thisYearToLastMonth':
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'lastWeek':
        start.setDate(today.getDate() - today.getDay() - 7);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'lastQuarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        start = new Date(today.getFullYear(), (currentQuarter - 1) * 3, 1);
        end = new Date(today.getFullYear(), currentQuarter * 3, 0);
        break;
      case 'lastYear':
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;
      case 'since30DaysAgo':
        start.setDate(today.getDate() - 30);
        break;
      case 'since60DaysAgo':
        start.setDate(today.getDate() - 60);
        break;
      case 'since90DaysAgo':
        start.setDate(today.getDate() - 90);
        break;
    }

    this.startDate = this.formatDateForInput(start);
    this.endDate = this.formatDateForInput(end);
  }

  onRegionChange(): void {
    // Update display region
    if (this.selectedRegion === 'all') {
      this.displayRegion = 'All';
    } else if (this.selectedRegion === 'other') {
      this.displayRegion = 'Other (Unlabeled)';
    } else {
      this.displayRegion = this.selectedRegion;
    }
  }

  generateReport(): void {
    const params = {
      startDate: this.startDate,
      endDate: this.endDate,
      region: this.selectedRegion
    };

    this.carrierReportService.generateReport(params).subscribe(data => {
      this.reportGenerated = true;
      
      // Update metrics
      this.metrics = data.metrics;
      
      // Update loads data
      this.loads = data.loads;
      
      // Calculate summary
      this.calculateSummary();
      
      // Format date range for display
      this.formattedDateRange = this.formatDateRange();
    });
  }

  formatDateRange(): string {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  }

  calculateSummary(): void {
    this.summary.totalRevenue = this.loads.reduce((sum, load) => sum + load.pricePaid, 0);
    this.summary.totalCO2TonsSaved = this.loads.reduce((sum, load) => sum + load.co2TonsSaved, 0);
    this.summary.totalTreeEquivalentSaved = this.loads.reduce((sum, load) => sum + load.treeEquivalentSaved, 0);
  }
}
