
const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, (req, res) => {
  try {
    const from = req.user && req.user.username;
    const { to, amount } = req.body;
    if (!from || !to || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Informe remetente, destinatário e valor.' });
    }
    const result = transferService.createTransfer({ from, to, amount });
    if (result.error) return res.status(400).json(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Erro inesperado na transferência.' });
  }
});

router.get('/', authenticateToken, (req, res) => {
  res.json(transferService.getAllTransfers());
});

module.exports = router;
