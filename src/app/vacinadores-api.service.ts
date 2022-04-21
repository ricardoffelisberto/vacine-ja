import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacinador } from './vacinadores.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VacinadoresApiService {
  constructor(private httpClient: HttpClient) {}

  getVacinadores(): Observable<Vacinador[]> {
    return this.httpClient.get<Vacinador[]>(`${environment.apiUrl}/vacinadores`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/vacinadores/${id}`);
  }

  findById(id: number): Observable<Vacinador> {
    return this.httpClient.get<Vacinador>(`${environment.apiUrl}/vacinadores/${id}`);
  }

  save(vacinador: Vacinador): Observable<Vacinador> {
    if(vacinador.id) {
      return this.httpClient.put<Vacinador>(`${environment.apiUrl}/vacinadores/${vacinador.id}`, vacinador);
    }
    return this.httpClient.post<Vacinador>(`${environment.apiUrl}/vacinadores`, vacinador);
  }
}
