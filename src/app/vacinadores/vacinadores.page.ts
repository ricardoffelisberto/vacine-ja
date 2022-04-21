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
import { VacinadoresApiService } from '../vacinadores-api.service';
import { Vacinador } from '../vacinadores.model';

import { VacinadoresService } from '../vacinadores.service';

@Component({
  selector: 'app-vacinadores',
  templateUrl: './vacinadores.page.html',
  styleUrls: ['./vacinadores.page.scss'],
})
export class VacinadoresPage
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  vacinadores: Vacinador[];
  loading = false;

  constructor(
    private alertController: AlertController,
    private vacinadoresApiService: VacinadoresApiService,
    private messageService: MessageService
  ) {
    this.vacinadores = [];
  }

  ngOnInit() {
    console.log('VacinadoresPage ngOnInit');
  }

  ionViewWillEnter(): void {
    this.listVacinadores();
    console.log('VacinadoresPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('VacinadoresPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('VacinadoresPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('VacinadoresPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('VacinadoresPage ngOnDestroy');
  }

  listVacinadores() {
    this.loading = true;
    this.vacinadoresApiService
      .getVacinadores()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (vacinadores) => (this.vacinadores = vacinadores),
        () =>
          this.messageService.error('Erro ao buscar a lista de vacinadores', () =>
            this.listVacinadores()
          )
      );
  }

  confirmRemove(vacinador: Vacinador) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir o vacinador ${vacinador.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.remove(vacinador),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  remove(vacinador: Vacinador) {
    this.loading = true;
    this.vacinadoresApiService
      .remove(vacinador.id)
      .subscribe(
        () => {
          this.messageService.success(`Excluído vacinador ${vacinador.nome} com sucesso!`);
          this.listVacinadores();
        },
        () => {
          this.messageService.error('Erro ao excluir o vacinador', () =>
            this.remove(vacinador)
          );
          this.loading = false;
        }
      );
  }
}
