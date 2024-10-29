/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { object, number, string, ObjectSchema } from 'yup';
import { validation } from '../../shared/middleware';

import { IProprietario } from '../../database/models';
import { ProprietariosProvider } from '../../database/providers/proprietarios';


interface IBodyProps extends Omit<IProprietario, 'id'>  { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
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

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await ProprietariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
