import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pet, table => {
      table.bigIncrements('id').primary().index(); 
      table.string('nome', 50).checkLength('<=', 50).index().notNullable();
      table.string('especie', 15).notNullable();
      table.date('dataNascimento');
      table.string('raca', 50);
      table.string('cor', 50);
      table.string('porte', 20);

      table.comment('Tabela usada para armazenar os pets.');
    }).then(() => {
      console.log(`# Created Table ${ETableNames.pet}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pet)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pet}`);
    });
}
