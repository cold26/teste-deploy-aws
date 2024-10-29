/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { object, number, string, ObjectSchema } from 'yup';
import { validation } from '../../shared/middleware';

import { IUsuario } from '../../database/models';
import { PetsProvider } from '../../database/providers/pets';
import { UsuariosProvider } from '../../database/providers/usuarios';


//criando a interface pet, com os dados que envio nele via post
interface IBodyProps extends Omit<IUsuario, 'id'>  {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    nome: yup.string().required().min(3),
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6),

  
  })),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsuariosProvider.create(req.body);
  
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
