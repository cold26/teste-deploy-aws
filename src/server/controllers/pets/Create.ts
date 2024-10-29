/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { object, number, string, ObjectSchema } from 'yup';
import { validation } from '../../shared/middleware';

import { IPet } from '../../database/models';
import { PetsProvider } from '../../database/providers/pets';


//criando a interface pet, com os dados que envio nele via post
interface IBodyProps extends Omit<IPet, 'id'>  {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    nome: yup.string().required().min(3),
    especie: yup.string().required(),
    dataNascimento: yup.date().required(),
    raca: yup.string().required(),
    cor: yup.string().required(),
    porte: yup.mixed<'pequeno' | 'medio' | 'grande'>().oneOf(['pequeno', 'medio', 'grande']).required(),
  })),
}));

export const create = async (req: Request<{}, {}, IPet>, res: Response) => {
  const result = await PetsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
