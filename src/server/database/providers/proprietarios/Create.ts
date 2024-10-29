import { ETableNames } from '../../ETableNames';
import { IProprietario } from '../../models';
import { Knex } from '../../knex';


export const create = async (proprietario: Omit<IProprietario, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.pet)
      .where('id', '=', proprietario.petId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('O pet usado no cadastro não foi encontrado');
    }


    const [result] = await Knex(ETableNames.proprietario).insert(proprietario).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
