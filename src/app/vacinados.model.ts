import { Vacina } from './vacinas.model';
import { Vacinador } from './vacinadores.model';

export interface Vacinado {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  endereco: string;
  nascimento: Date;
  vacinas: Vacina[];
  vacinadores: Vacinador[];
}