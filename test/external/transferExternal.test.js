//Bibliotecas
const request = require('supertest');
const { expect } = require ('chai');


//Testes
describe('Transfer External', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () =>{
            const resposta = await request('http://localhost:3000')
                .post('/api/transfers')
                .send({
                    from: 'julio',
                    to: 'priscila',
                    amount: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')
        });

    });
});