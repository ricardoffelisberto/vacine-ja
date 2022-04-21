import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { VacinasApiService } from '../vacinas-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-vacinas-register',
  templateUrl: './vacinas-register.page.html',
  styleUrls: ['./vacinas-register.page.scss'],
})

export class VacinasRegisterPage
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
    private vacinasApiService: VacinasApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log('VacinasApiService ngOnInit');
    this.form = this.formBuilder.group({
      id: [''],
      tipo: ['', Validators.required],
      laboratorio: ['', Validators.required],
      lote: ['', Validators.required],
      fabricacao: [''],
      validade: [''],
    });

    const id = +this.activatedRoute.snapshot.params.id;
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.loading = true;
    this.vacinasApiService
      .findById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (vacina) => {
          if (vacina) {
            this.form.patchValue({
              ...vacina,
            });
          }
        },
        () =>
          this.messageService.error(
            `Erro ao buscar a vacina com código ${id}`,
            () => this.findById(id)
          )
      );
  }

  ionViewWillEnter(): void {
    console.log('VacinasRegisterPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('VacinasRegisterPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('VacinasRegisterPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('VacinasRegisterPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('VacinasRegisterPage ngOnDestroy');
  }

  salvar() {
    const { tipo } = this.form.value;

    this.loading = true;

    this.vacinasApiService
      .save(this.form.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          this.messageService.success(`Vacina ${tipo} foi salvo sucesso!`);
          this.router.navigate(['vacinas']);
        },
        () => {
          this.messageService.error(`Erro ao salvar a vacina ${tipo}`, () =>
            this.salvar()
          );
        }
      );
  }
}