import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacinado } from './vacinados.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VacinadosApiService {
  constructor(private httpClient: HttpClient) {}

  getVacinados(): Observable<Vacinado[]> {
    return this.httpClient.get<Vacinado[]>(`${environment.apiUrl}/vacinados`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/vacinados/${id}`);
  }

  findById(id: number): Observable<Vacinado> {
    return this.httpClient.get<Vacinado>(`${environment.apiUrl}/vacinados/${id}`);
  }

  save(vacinado: Vacinado): Observable<Vacinado> {
    if(vacinado.id) {
      return this.httpClient.put<Vacinado>(`${environment.apiUrl}/vacinados/${vacinado.id}`, vacinado);
    }
    return this.httpClient.post<Vacinado>(`${environment.apiUrl}/vacinados`, vacinado);
  }
}
