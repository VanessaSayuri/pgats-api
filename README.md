# API de Transferências e Usuários

Esta API permite registrar usuários, realizar login, consultar usuários e efetuar transferências de valores entre usuários. O objetivo é servir como base para estudos de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```

## Estrutura de Diretórios

- `controller/` - Lógica das rotas
- `service/` - Regras de negócio
- `model/` - Dados em memória
- `app.js` - Configuração da aplicação Express
- `server.js` - Inicialização do servidor
- `swagger.json` - Documentação Swagger

## Como executar

```powershell
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Documentação Swagger

Acesse a documentação interativa em:
```
http://localhost:3000/api-docs
```

## Endpoints principais

- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Login
- `GET /api/users` - Listar usuários
- `POST /api/transfers` - Realizar transferência
- `GET /api/transfers` - Listar transferências

## Regras de Negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Testes

Para testar a API, recomenda-se o uso de ferramentas como [Supertest](https://github.com/visionmedia/supertest) e [Jest](https://jestjs.io/).

---

API criada para fins educacionais.
