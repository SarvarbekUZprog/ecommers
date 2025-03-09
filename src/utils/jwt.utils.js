const jwt = require("jsonwebtoken")
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../data/config")

async function generateAccessToken(userId) {
	return jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

async function generateRefreshToken(userId) {
	return jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}

async function verifyRefreshToken(token) {
	try {
	  return jwt.verify(token, REFRESH_TOKEN_SECRET);
	} catch (error) {
	  return null;
	}
  }

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken
}