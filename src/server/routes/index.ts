/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PetsController, ProprietariosController, UsuariosController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';



const router = Router();



router.get('/', (_, res) => {
  return res.send('Api rodando!');
});




router.get('/pets',ensureAuthenticated, PetsController.getAllValidation,  PetsController.getAll);
router.get('/pets/:id',ensureAuthenticated, PetsController.getByIdValidation, PetsController.getById);
router.put('/pets/:id',ensureAuthenticated,PetsController.updateByIdValidation, PetsController.updateById);
router.post('/pets',ensureAuthenticated,PetsController.createValidation, PetsController.create);
router.delete('/pets/:id',ensureAuthenticated,PetsController.deleteByIdValidation, PetsController.deleteById);


router.get('/proprietarios',ensureAuthenticated,ProprietariosController.getAllValidation, ProprietariosController.getAll);
router.get('/proprietarios/:id',ensureAuthenticated,ProprietariosController.getByIdValidation, ProprietariosController.getById);
router.put('/proprietarios/:id',ensureAuthenticated,ProprietariosController.updateByIdValidation, ProprietariosController.updateById);
router.post('/proprietarios',ensureAuthenticated, ProprietariosController.createValidation, ProprietariosController.create);
router.delete('/proprietarios/:id',ensureAuthenticated, ProprietariosController.deleteByIdValidation, ProprietariosController.deleteById);

router.post('/cadastrar',UsuariosController.signUpValidation, UsuariosController.signUp);
router.post('/entrar',UsuariosController.signInValidation, UsuariosController.signIn);






export { router };
