import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.proprietario, table => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('cpf', 11).notNullable();  
      table.string('telefone', 15);           
      table.string('email', 50);
      table.string('cidade', 50);

      table
        .bigInteger('petId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.pet)
        .onUpdate('CASCADE')
        .onDelete(' RESTRICT ');

      table.comment('Tabela usada para armazenar os proprietarios no sistema.');
    }).then(() => {
      console.log(`# Created Table ${ETableNames.proprietario}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.proprietario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.proprietario}`);
    });
}
