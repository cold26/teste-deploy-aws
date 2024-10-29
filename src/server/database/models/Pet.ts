

export interface IPet {
  id: number;
  nome: string;
  especie: string;
  dataNascimento: Date;
  raca: string;
  cor: string;
  porte: 'pequeno' | 'medio' | 'grande';
}