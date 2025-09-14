const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');

router.post('/', (req, res) => {
  try {
    const { from, to, amount } = req.body;
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

router.get('/', (req, res) => {
  res.json(transferService.getAllTransfers());
});

module.exports = router;
