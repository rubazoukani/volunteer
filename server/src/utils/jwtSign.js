const jwt = require("jsonwebtoken");

const jwtsign = async (data) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = jwtsign;
