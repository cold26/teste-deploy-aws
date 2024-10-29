import { ETableNames } from '../../ETableNames';
import { IProprietario } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IProprietario | Error> => {
  try {
    const result = await Knex(ETableNames.proprietario)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
