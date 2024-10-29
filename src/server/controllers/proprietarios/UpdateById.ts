/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IProprietario } from '../../database/models';
import { ProprietariosProvider } from '../../database/providers/proprietarios';

interface IParamProps {
  id?: number;
}

interface IBodyProps  extends Omit<IProprietario, 'id'>  {}

//dados que desejo atualizar 
export const updateByIdValidation = validation((get) => ({
  body: get<IBodyProps>(yup.object({
    nomeCompleto: yup.string().required().min(3),
    petId: yup.number().required().positive().integer(),
    cpf: yup.number().required().test('len', 'O CPF deve ter 11 dígitos', (val) => val?.toString().length === 11),
    telefone: yup.number().required().test('len', 'O telefone deve ter 10 ou 11 dígitos', (val) => {
      const length = val?.toString().length;
      return length === 10 || length === 11;
    }),
    email: yup.string().required().email(),
    cidade: yup.string().required().min(3),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) 
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parametro ID precisa ser informado'
      }
    });

  const result = await ProprietariosProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);

};
