/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import * as yup from 'yup';
import { Schema, ValidationError, Maybe, AnyObject } from 'yup';
import { StatusCodes } from 'http-status-codes';


type TPropert =  'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe <AnyObject >>(schema: Schema<T>) => Schema<T>

type TAllSchemas = Record<TPropert, Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas : TGetAllSchemas) => RequestHandler;


export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema); 


  const  errorsResult: Record<string, Record<string, string>>= {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TPropert], { abortEarly: false });
      //return next();
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};
  
      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      });

      errorsResult[key] = errors;
    }
  
  });
  

  if (Object.entries(errorsResult).length=== 0) {
    return next();
  }else {
    return res.status(StatusCodes.BAD_REQUEST).json ({ errors: errorsResult });
  }

  
};
