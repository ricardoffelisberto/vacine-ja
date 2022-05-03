import { Injectable } from '@angular/core';

import { Vacinado } from './vacinados.model';

@Injectable({
  providedIn: 'root',
})
export class VacinadosService {
  private vacinados: Vacinado[];
  private contador = 6;

  constructor() {
    this.vacinados = JSON.parse(localStorage.getItem('vacinados')) ?? [];
  }

  public getVacinados() {
    return this.vacinados;
  }

  public remove(nome: string) {
    this.vacinados = this.vacinados.filter((vacinado) => vacinado.nome !== nome);
    localStorage.setItem('vacinados', JSON.stringify(this.vacinados));
  }

  public save(vacinado: Vacinado) {
    if (vacinado.id) {
      const index = this.vacinados.findIndex(v => v.id === vacinado.id);
      this.vacinados[index] = vacinado;
    } else {
      const id = this.contador++;
      this.vacinados.push({ ...vacinado, id });
    }
    localStorage.setItem('vacinados', JSON.stringify(this.vacinados));
  }

  public findById(id: number) {
    return this.vacinados.find(vacinado => vacinado.id === id);
  }
}
