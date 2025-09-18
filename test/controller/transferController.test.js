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

        beforeEach(async () =>{
            const respostaLogin = await request(app)
                .post('/api/users/login')
                .send({
                    username:'julio',
                    password: '123456'
                });
            token = respostaLogin.body.token;
        })

        it('Quando informo remetente e destinatario inexistentes recebo 400', async () =>{
            const resposta = await request(app)
                .post('/api/transfers')
                .set('authorization', `Bearer ${token}`)
                .send({
                    from: 'julio',
                    to: 'maria',
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
                .set('authorization', `Bearer ${token}`)
                .send({
                    from: 'julio',
                    to: 'priscila',
                    amount: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')

        });
         it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () =>{
            // Preparando os dados
                // Carregar o arquivo
                // Preparar a forma de ignorar os campos dinamicos
            

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
                .set('authorization', `Bearer ${token}`)
                .send({
                    from: 'julio',
                    to: 'priscila',
                    amount: 100
                    
                });
            expect(resposta.status).to.equal(201);

            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json');

            delete resposta.body.date;
            delete respostaEsperada.date;

            expect(resposta.body).to.deep.equal(respostaEsperada);
            // Um expect para comparar a resposta.body com a string contida no arquivo
            // expect(resposta.body).to.have.property('from', 'julio')
            // expect(resposta.body).to.have.property('to', 'priscila')
            // expect(resposta.body).to.have.property('amount', 100)

            //console.log(resposta.body);
            
        });
            //Resetar o mock
        afterEach(() => {
            sinon.restore();
        })
    
    });
});