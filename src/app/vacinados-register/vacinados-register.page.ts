import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MessageService } from '../services/message.service';
import { VacinadosApiService } from '../vacinados-api.service';
import { finalize } from 'rxjs/operators';
import { Vacina } from '../vacinas.model';
import { Vacinador } from '../vacinadores.model';
import { VacinasApiService } from '../vacinas-api.service';
import { VacinadoresApiService } from '../vacinadores-api.service';

import { MaskPipe } from 'ngx-mask'

@Component({
  selector: 'app-vacinados-register',
  templateUrl: './vacinados-register.page.html',
  styleUrls: ['./vacinados-register.page.scss'],
})
export class VacinadosRegisterPage
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
  vacinas: Vacina[];
  vacinadores: Vacinador[];

  constructor(
    private formBuilder: FormBuilder,
    private vacinadosApiService: VacinadosApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private vacinasApiService: VacinasApiService,
    private vacinadoresApiService: VacinadoresApiService,
    private maskPipe: MaskPipe
  ) {}

  updateWithMaskRg(event) {
    this.form.controls.rg.setValue(this.maskPipe.transform(event.currentTarget.value, '0.000.000'));
  };

  updateWithMaskCpf(event) {
    this.form.controls.cpf.setValue(this.maskPipe.transform(event.currentTarget.value, '000.000.000-00'));
  };

  ngOnInit() {
    console.log('VacinadosRegisterPage ngOnInit');

    this.vacinasApiService.getVacinas().subscribe((vacinas) => this.vacinas = vacinas);
    this.vacinadoresApiService.getVacinadores().subscribe((vacinadores) => this.vacinadores = vacinadores);

    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      nascimento: ['', Validators.required],
      vacina: [[]],
      vacinador: [[]],
    });

    const id = +this.activatedRoute.snapshot.params.id;
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.loading = true;
    this.vacinadosApiService
      .findById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (vacinado) => {
          if (vacinado) {
            this.form.patchValue({
              ...vacinado,
            });
          }
        },
        () =>
          this.messageService.error(
            `Erro ao buscar o vacinado com código ${id}`,
            () => this.findById(id)
          )
      );
  }

  ionViewWillEnter(): void {
    console.log('VacinadosRegisterPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('VacinadosRegisterPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('VacinadosRegisterPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('VacinadosRegisterPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('VacinadosRegisterPage ngOnDestroy');
  }

  compareWithVacina(o1: Vacina, o2: Vacina | Vacina[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: Vacina) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }

  compareWithVacinador(o1: Vacinador, o2: Vacinador | Vacinador[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: Vacinador) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }

  salvar() {
    const { nome } = this.form.value;

    this.loading = true;

    this.vacinadosApiService
      .save(this.form.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          this.messageService.success(`Vacinado ${nome} foi salvo sucesso!`);
          this.router.navigate(['vacinados']);
        },
        () => {
          this.messageService.error(`Erro ao salvar o vacinado ${nome}`, () =>
            this.salvar()
          );
        }
      );
  }
}