const { transfers } = require('../model/transferModel');
const { users } = require('../model/userModel');

function createTransfer({ from, to, amount }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) return { error: 'Usuário remetente ou destinatário não encontrado.' };
  if (recipient.favorecido !== true && amount >= 5000) {
    return { error: 'Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.' };
  }
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return { transfer };
}

function getAllTransfers() {
  return transfers;
}

module.exports = {
  createTransfer,
  getAllTransfers,
};
