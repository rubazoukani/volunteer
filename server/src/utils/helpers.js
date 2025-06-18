const bcrypt = require("bcryptjs");

const generateCode = () => Math.floor(1000 + Math.random() * 9000).toString();

const hashingPassword = async (password) => {
  const saltRounds = parseInt(process.env.SALT, 10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
module.exports = {
  hashingPassword,
  generateCode
}