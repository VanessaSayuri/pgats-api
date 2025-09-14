//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require ('chai');

// Aplicação
const app = require('../../app');

//Mock
const transferService = require('../../service/transferService');


//Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () =>{
            const resposta = await request(app)
                .post('/api/transfers')
                .send({
                    from: 'julio',
                    to: 'priscila',
                    amount: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')
        });

        it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () =>{

            //Mockar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'createTransfer');
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado.'))
           
           

            const resposta = await request(app)
                .post('/api/transfers')
                .send({
                    from: 'julio',
                    to: 'priscila',
                    amount: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')

            //Resetar o mock
            sinon.restore();
        });
         it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () =>{

            //Mockar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'createTransfer');
            transferServiceMock.returns({
                    from: 'julio',
                    to: 'priscila',
                    amount: 100,
                    date: new Date()
                });


                const resposta = await request(app)
                .post('/api/transfers')
                .send({
                    from: 'julio',
                    to: 'priscila',
                    amount: 100
                    
                });
            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('from', 'julio')
            expect(resposta.body).to.have.property('to', 'priscila')
            expect(resposta.body).to.have.property('amount', 100)


            //Resetar o mock
            sinon.restore();
        });
    });
});