import { Injectable } from '@angular/core';

import { Vacina } from './vacinas.model';

@Injectable({
  providedIn: 'root',
})
export class VacinasService {
  private vacinas: Vacina[];
  private contador = 6;

  constructor() {
    this.vacinas = JSON.parse(localStorage.getItem('vacinas')) ?? [];
  }

  public getVacinas() {
    return this.vacinas;
  }

  public remove(tipo: string) {
    this.vacinas = this.vacinas.filter((vacina) => vacina.tipo !== tipo);
    localStorage.setItem('vacinas', JSON.stringify(this.vacinas));
  }

  public save(vacina: Vacina) {
    if (vacina.id) {
      const index = this.vacinas.findIndex(g => g.id === vacina.id);
      this.vacinas[index] = vacina;
    } else {
      const id = this.contador++;
      this.vacinas.push({ ...vacina, id });
    }
    localStorage.setItem('vacinas', JSON.stringify(this.vacinas));
  }

  public findById(id: number) {
    return this.vacinas.find(vacina => vacina.id === id);
  }
}
