import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  IonItemSliding,
  ToastController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { VacinadosApiService } from '../vacinados-api.service';
import { VacinasApiService } from '../vacinas-api.service';
import { VacinadoresApiService } from '../vacinadores-api.service';
import { Vacinado } from '../vacinados.model';

import { VacinadosService } from '../vacinados.service';

@Component({
  selector: 'app-vacinados-list',
  templateUrl: './vacinados.page.html',
  styleUrls: ['./vacinados.page.scss'],
})
export class VacinadosPage
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  vacinados: Vacinado[];
  loading = false;

  constructor(
    private alertController: AlertController,
    private vacinadosApiService: VacinadosApiService,
    private vacinasApiService: VacinasApiService,
    private vacinadoresApiService: VacinadoresApiService,
    private messageService: MessageService,
  ) {
    this.vacinados = [];
  }

  ngOnInit() {
    console.log('VacinadosListPage ngOnInit');
  }

  ionViewWillEnter(): void {
    this.listVacinados();
    console.log('VacinadosListPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('VacinadosListPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('VacinadosListPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('VacinadosListPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('VacinadosListPage ngOnDestroy');
  }

  listVacinados() {
    this.loading = true;
    this.vacinadosApiService
      .getVacinados()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (vacinados) => (this.vacinados = vacinados),
        () =>
          this.messageService.error('Erro ao buscar a lista de vacinados', () =>
            this.listVacinados()
          )
      );
  }

  confirmRemove(vacinado: Vacinado) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir o vacinado ${vacinado.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.remove(vacinado),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  remove(vacinado: Vacinado) {
    this.loading = true;
    this.vacinadosApiService
      .remove(vacinado.id)
      .subscribe(
        () => {
          this.messageService.success(`Excluído vacinado ${vacinado.nome} com sucesso!`);
          this.listVacinados();
        },
        () => {
          this.messageService.error('Erro ao excluir o vacinado', () =>
            this.remove(vacinado)
          );
          this.loading = false;
        }
      );
  }

  close(sliding: IonItemSliding) {
    sliding.close();
  }
}