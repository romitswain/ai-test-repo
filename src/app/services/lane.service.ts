import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lane } from '../models/lane.model';

@Injectable({
  providedIn: 'root'
})
export class LaneService {
  private apiUrl = '/api/lanes'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getLanes(): Observable<Lane[]> {
    return this.http.get<Lane[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Lane[]>('getLanes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
