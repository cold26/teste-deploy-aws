import { IPet, IProprietario, IUsuario } from '../../models';

declare module 'knex/types/tables'{
  interface Tables{
    pet: IPet
    proprietario : IProprietario
    usuario : IUsuario
    
  }
}