import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnyObject } from 'chart.js/types/basic';

@Injectable({
  providedIn: 'root',
})
export class HomeApiService {
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(`${environment.apiUrl}/dashboard`);
  }
}
