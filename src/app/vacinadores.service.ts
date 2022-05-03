import { Injectable } from '@angular/core';

import { Vacinador } from './vacinadores.model';

@Injectable({
  providedIn: 'root',
})
export class VacinadoresService {
  private vacinadores: Vacinador[];
  private contador = 6;

  constructor() {
    this.vacinadores = JSON.parse(localStorage.getItem('vacinadores')) ?? [];
  }

  public getVacinadores() {
    return this.vacinadores;
  }

  public remove(nome: string) {
    this.vacinadores = this.vacinadores.filter((vacinador) => vacinador.nome !== nome);
    localStorage.setItem('vacinadores', JSON.stringify(this.vacinadores));
  }

  public save(vacinador: Vacinador) {
    if (vacinador.id) {
      const index = this.vacinadores.findIndex(v => v.id === vacinador.id);
      this.vacinadores[index] = vacinador;
    } else {
      const id = this.contador++;
      this.vacinadores.push({ ...vacinador, id });
    }
    localStorage.setItem('vacinadores', JSON.stringify(this.vacinadores));
  }

  public findById(id: number) {
    return this.vacinadores.find(vacinador => vacinador.id === id);
  }
}
