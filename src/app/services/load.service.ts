import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Load } from '../models/load.model';

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  private apiUrl = '/api/loads'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getLoads(): Observable<Load[]> {
    return this.http.get<Load[]>(this.apiUrl);
  }

  downloadLoadsCSV(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'text/csv'
    });

    return this.http.get(`${this.apiUrl}/export-csv`, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
