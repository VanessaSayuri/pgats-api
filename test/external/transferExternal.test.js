//Bibliotecas
const request = require('supertest');
const { expect } = require ('chai');
const { log } = require('node:console');


//Testes
describe('Transfer External', () => {
    describe('POST /api/transfers', () => {

        beforeEach(async () =>{
            const respostaLogin = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    username:'julio',
                    password: '123456'
                });
        token = respostaLogin.body.token;
        })
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () =>{
            
            //2) Realizar a transferência
            const resposta = await request('http://localhost:3000')
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

        it('Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () =>{
        // Preparando os dados
            // Carregar o arquivo
            // Preparar a forma de ignorar os campos dinamicos

            const resposta = await request('http://localhost:3000')
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
        delete resposta.body.transfer.date;
        delete respostaEsperada.date;

        expect(resposta.body.transfer).to.deep.equal(respostaEsperada);
        

        });

    });
});