import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.page.html',
  styleUrls: ['./vacinas.page.scss'],
})
export class VacinasPage {
  private vacinas: Array<Object> = [];
  constructor(public navCtrl: NavController) {
    this.vacinas = [
      {
        "nome": "teste",
      },
      {
        "nome": "teste2",
      }
    ]
  }
}
