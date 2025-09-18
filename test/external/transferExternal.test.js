//Bibliotecas
const request = require('supertest');
const { expect } = require ('chai');
const { log } = require('node:console');


//Testes
describe('Transfer External', () => {
    describe('POST /api/transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () =>{
            //1) Capturar o token
            const respostaLogin = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    username:'julio',
                    password: '123456'
                });
           
                const token = respostaLogin.body.token;
            
            
            //2) Realizar a transferência
            const resposta = await request('http://localhost:3000')
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

    });
});