const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.post('/register', (req, res) => {
  const { username, password, favorecido } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Informe username e password.' });
  }
  const result = userService.registerUser({ username, password, favorecido });
  if (result.error) return res.status(409).json(result);
  res.status(201).json(result.user);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Informe username e password.' });
  }
  const result = userService.loginUser({ username, password });
  if (result.error) return res.status(401).json(result);
  res.json(result.user);
});

router.get('/', (req, res) => {
  res.json(userService.getAllUsers());
});

module.exports = router;
