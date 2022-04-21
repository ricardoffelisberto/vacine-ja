import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { VacinasApiService } from '../vacinas-api.service';
import { Vacina } from '../vacinas.model';

import { VacinasService } from '../vacinas.service';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.page.html',
  styleUrls: ['./vacinas.page.scss'],
})
export class VacinasPage
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  vacinas: Vacina[];
  loading = false;

  constructor(
    private alertController: AlertController,
    private vacinasApiService: VacinasApiService,
    private messageService: MessageService
  ) {
    this.vacinas = [];
  }

  ngOnInit() {
    console.log('VacinasPage ngOnInit');
  }

  ionViewWillEnter(): void {
    this.listVacinas();
    console.log('VacinasPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('VacinasPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('VacinasPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('VacinasPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('VacinasPage ngOnDestroy');
  }

  listVacinas() {
    this.loading = true;
    this.vacinasApiService
      .getVacinas()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (vacinas) => (this.vacinas = vacinas),
        () =>
          this.messageService.error('Erro ao buscar a lista de vacinas', () =>
            this.listVacinas()
          )
      );
  }

  confirmRemove(vacina: Vacina) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir a vacina ${vacina.tipo}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.remove(vacina),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  remove(vacina: Vacina) {
    this.loading = true;
    this.vacinasApiService
      .remove(vacina.id)
      .subscribe(
        () => {
          this.messageService.success(`Excluído vacina ${vacina.tipo} com sucesso!`);
          this.listVacinas();
        },
        () => {
          this.messageService.error('Erro ao excluir a vacina', () =>
            this.remove(vacina)
          );
          this.loading = false;
        }
      );
  }
}
