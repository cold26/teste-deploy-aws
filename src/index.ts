import {Knex} from './server/database/knex';
import { server } from './server/Server';

const StartServer=  () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3333}`);
  });
};


if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest()
    .then(() => {
      console.log('Migrações executadas com sucesso.');
      StartServer(); 
    })
    .catch((error) => {
      console.error('Erro ao executar as migrações:', error);
      StartServer(); 
    });
} else {
  StartServer();
}

