import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacina } from './vacinas.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VacinasApiService {
  constructor(private httpClient: HttpClient) {}

  getVacinas(): Observable<Vacina[]> {
    return this.httpClient.get<Vacina[]>(`${environment.apiUrl}/vacinas`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/vacinas/${id}`);
  }

  findById(id: number): Observable<Vacina> {
    return this.httpClient.get<Vacina>(`${environment.apiUrl}/vacinas/${id}`);
  }

  save(vacina: Vacina): Observable<Vacina> {
    if(vacina.id) {
      return this.httpClient.put<Vacina>(`${environment.apiUrl}/vacinas/${vacina.id}`, vacina);
    }
    return this.httpClient.post<Vacina>(`${environment.apiUrl}/vacinas`, vacina);
  }
}
