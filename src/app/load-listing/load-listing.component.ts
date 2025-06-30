import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadService } from '../services/load.service';
import { Load } from '../models/load.model';

@Component({
  selector: 'app-load-listing',
  templateUrl: './load-listing.component.html',
  styleUrls: ['./load-listing.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoadListingComponent implements OnInit {
  loads: Load[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private loadService: LoadService) {}

  ngOnInit(): void {
    this.fetchLoads();
  }

  fetchLoads(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.loadService.getLoads().subscribe({
      next: (data) => {
        this.loads = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load data. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching loads:', error);
      }
    });
  }

  downloadCSV(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.loadService.downloadLoadsCSV().subscribe({
      next: (blob: Blob) => {
        this.isLoading = false;
        
        // Create a download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `loads-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (error) => {
        this.errorMessage = 'Failed to download CSV. Please try again later.';
        this.isLoading = false;
        console.error('Error downloading CSV:', error);
      }
    });
  }
}
