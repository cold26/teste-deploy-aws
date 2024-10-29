import { ETableNames } from '../../ETableNames';
import { IPet } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IPet[] | Error> => {
  try {
    const result = await Knex(ETableNames.pet)
      .select('id', 'nome', 'especie', 'dataNascimento', 'raca', 'cor', 'porte') // Inclui o campo 'especie'
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    // Verificação adicional por ID, caso não esteja nos resultados filtrados
    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.pet)
        .select('id', 'nome', 'especie', 'dataNascimento', 'raca', 'cor', 'porte') // Inclui o campo 'especie'
        .where('id', '=', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
