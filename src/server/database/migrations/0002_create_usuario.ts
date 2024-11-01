import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.usuario, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 255).notNullable(); // Ajuste o comprimento conforme necessário
      table.string('senha', 255).notNullable(); // Ajuste o comprimento conforme necessário
      table.string('email', 255).index().unique().notNullable(); // Ajuste o comprimento conforme necessário
      
      table.comment('Tabela usada para armazenar os usuarios no sistema.');
    }).then(() => {
      console.log(`# Created Table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.usuario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.usuario}`);
    });
}
