import { ETableNames } from '../../ETableNames';
import { IPet } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, pet: Omit<IPet, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pet)
      .update(pet)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
