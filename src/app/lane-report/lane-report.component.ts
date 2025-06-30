import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaneService } from '../services/lane.service';
import { Lane } from '../models/lane.model';

@Component({
  selector: 'app-lane-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lane-report.component.html',
  styleUrls: ['./lane-report.component.scss']
})
export class LaneReportComponent implements OnInit {
  lanes: Lane[] = [];

  constructor(private laneService: LaneService) {}

  ngOnInit(): void {
    this.loadLanes();
  }

  loadLanes(): void {
    this.laneService.getLanes().subscribe({
      next: (data) => {
        this.lanes = data;
      },
      error: (error) => {
        console.error('Error loading lanes:', error);
      }
    });
  }

  downloadCSV(): void {
    // Create CSV content
    const headers = [
      'Lane Number', 'Equipment', 'Origin', 'Destination', 'Days',
      'Pickup Window', 'Delivery Window', 'Weekly Frequency', 'Min Monthly Frequency',
      'Max Weight (lbs)', 'Origin Radius', 'Destination Radius', 'Special Equipment',
      'Dispatch Name', 'Dispatch Email', 'Min Auto Accept', 'Seasonality', 'Holiday Exclusions'
    ];

    let csvContent = headers.join(',') + '\n';

    this.lanes.forEach(lane => {
      const rowData = [
        lane.laneNumber,
        lane.equipment,
        `${lane.origin.city}, ${lane.origin.state}, ${lane.origin.zip}`,
        `${lane.destination.city}, ${lane.destination.state}, ${lane.destination.zip}`,
        this.formatDays(lane.days),
        `${lane.pickupwindow.start} - ${lane.pickupwindow.end}`,
        `${lane.deliverywindow.start} - ${lane.deliverywindow.end}`,
        lane.weeklyFrequency,
        lane.minMonthlyFrequency,
        lane.maxWeight,
        lane.originRadius,
        lane.destinationRadius,
        this.formatSpecialEquipment(lane.specialEquipment),
        lane.dispatchName,
        lane.dispatchEmail,
        lane.minAutoAccept,
        this.formatSeasonality(lane.seasonality),
        this.formatHolidayExclusions(lane.holidayExclusions)
      ];

      // Escape fields that might contain commas
      const escapedRowData = rowData.map(field => {
        if (field && typeof field === 'string' && field.includes(',')) {
          return `"${field}"`;
        }
        return field;
      });

      csvContent += escapedRowData.join(',') + '\n';
    });

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `lane-report-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  printReport(): void {
    window.print();
  }

  formatDays(days: string[]): string {
    if (days.includes('All')) {
      return 'All Days';
    } else if (days.includes('Weekdays')) {
      return 'Weekdays';
    } else {
      return days.join(', ');
    }
  }

  formatSpecialEquipment(equipment: string[]): string {
    return equipment && equipment.length > 0 ? equipment.join(', ') : 'None';
  }

  formatSeasonality(seasonality: { months: string[] }): string {
    if (seasonality.months.includes('All')) {
      return 'All Year';
    } else {
      return seasonality.months.join(', ');
    }
  }

  formatHolidayExclusions(exclusions: { start: string, end: string }[]): string {
    if (!exclusions || exclusions.length === 0) {
      return 'None';
    }
    return exclusions.map(e => `${e.start} - ${e.end}`).join('; ');
  }
}
