import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Pets - GetAll', () => {
  it('Buscar todos os registros', async () => {
    const res1 = await testServer
      .post('/pets')
      .send({
        nome: 'fred',
        especie: 'cachorro',
        dataNascimento: '2022-05-20',
        raca: 'pitbull',
        cor: 'preto',
        porte: 'pequeno'
      });

    // Verifica se o pet foi criado com sucesso
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/pets')
      .send();

    // Verifica se o cabeçalho 'x-total-count' é maior que 0
    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    // Verifica se o status da resposta é 200 OK
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    // Verifica se o corpo da resposta contém registros
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
