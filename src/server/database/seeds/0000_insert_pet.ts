import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.pet).count<[{ count: number }]>('* as count');
  if (count > 0) return;

  const petsToInsert = petsList.map(pet => ({
    nome: pet.nome,
    especie: pet.especie,
    dataNascimento: new Date(pet.dataNascimento),  // Convertendo a string para Date
    raca: pet.raca,
    cor: pet.cor,
    porte: pet.porte as 'pequeno' | 'medio' | 'grande', 
  }));

  await knex(ETableNames.pet).insert(petsToInsert);
};

const petsList = [
  { nome: 'Fred', especie: 'Cachorro', dataNascimento: '2020-05-15', raca: 'Pug', cor: 'Bege', porte: 'grande' },
  { nome: 'Bella', especie: 'Gato', dataNascimento: '2019-07-10', raca: 'Siamês', cor: 'Cinza', porte: 'pequeno' },
  { nome: 'Max', especie: 'Cachorro', dataNascimento: '2021-01-20', raca: 'Labrador', cor: 'Amarelo', porte: 'grande' },
  { nome: 'Luna', especie: 'Gato', dataNascimento: '2018-11-30', raca: 'Persa', cor: 'Branco', porte: 'pequeno' },
  { nome: 'Charlie', especie: 'Cachorro', dataNascimento: '2017-08-22', raca: 'Golden Retriever', cor: 'Dourado', porte: 'grande' },
  { nome: 'Molly', especie: 'Gato', dataNascimento: '2022-03-14', raca: 'Bengal', cor: 'Marrom', porte: 'medio' },
];