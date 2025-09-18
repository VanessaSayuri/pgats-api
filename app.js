const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(express.json());

app.use('/api/users', userController);
app.use('/api/transfers', authenticateToken, transferController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
