/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IPet } from '../../database/models';
import { PetsProvider } from '../../database/providers/pets';

interface IParamProps {
  id?: number;
}

//dados do pet que vão ser atualizados
interface IBodyProps  extends Omit<IPet, 'id'>  {}

//dados que desejo atualizar 
export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    especie: yup.string().required(),
    dataNascimento: yup.date().required(),
    raca: yup.string().required(),
    cor: yup.string().required(),
    porte: yup.mixed<'pequeno' | 'medio' | 'grande'>().oneOf(['pequeno', 'medio', 'grande']).required(),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) 
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parametro ID precisa ser informado'
      }
    });

  const result = await PetsProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);

};
