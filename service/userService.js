const { users } = require('../model/userModel');

function registerUser({ username, password, favorecido }) {
  if (users.find(u => u.username === username)) {
    return { error: 'Usuário já existe.' };
  }
  const user = { username, password, favorecido: !!favorecido };
  users.push(user);
  return { user };
}

function loginUser({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: 'Login ou senha inválidos.' };
  return { user };
}

function getAllUsers() {
  return users;
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
