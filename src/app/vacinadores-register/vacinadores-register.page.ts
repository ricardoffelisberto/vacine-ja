import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { VacinadoresApiService } from '../vacinadores-api.service';
import { finalize } from 'rxjs/operators';

import { MaskPipe } from 'ngx-mask'

@Component({
  selector: 'app-vacinadores-register',
  templateUrl: './vacinadores-register.page.html',
  styleUrls: ['./vacinadores-register.page.scss'],
})
export class VacinadoresRegisterPage
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  form: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private vacinadoresApiService: VacinadoresApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private maskPipe: MaskPipe
  ) {}

  updateWithMaskRg(event) {
    this.form.controls.rg.setValue(this.maskPipe.transform(event.currentTarget.value, '0.000.000'));
  };

  updateWithMaskCpf(event) {
    this.form.controls.cpf.setValue(this.maskPipe.transform(event.currentTarget.value, '000.000.000-00'));
  };

  ngOnInit() {
    console.log('VacinadoresApiService ngOnInit');
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      nascimento: ['', Validators.required],
    });

    const id = +this.activatedRoute.snapshot.params.id;
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.loading = true;
    this.vacinadoresApiService
      .findById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (vacinador) => {
          if (vacinador) {
            this.form.patchValue({
              ...vacinador,
            });
          }
        },
        () =>
          this.messageService.error(
            `Erro ao buscar o vacinador com código ${id}`,
            () => this.findById(id)
          )
      );
  }

  ionViewWillEnter(): void {
    console.log('VacinadoresRegisterPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('VacinadoresRegisterPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('VacinadoresRegisterPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('VacinadoresRegisterPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('VacinadoresRegisterPage ngOnDestroy');
  }

  salvar() {
    const { nome } = this.form.value;

    this.loading = true;

    this.vacinadoresApiService
      .save(this.form.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          this.messageService.success(`Vacinador ${nome} foi salvo sucesso!`);
          this.router.navigate(['vacinadores']);
        },
        () => {
          this.messageService.error(`Erro ao salvar o vacinador ${nome}`, () =>
            this.salvar()
          );
        }
      );
  }
}
