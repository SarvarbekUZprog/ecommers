require('dotenv').config()

module.exports = {
	PORT: process.env.PORT || 3000,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	EMAIL_HOST_USER: process.env.EMAIL_HOST_USER,
	EMAIL_HOST_PASSWORD: process.env.EMAIL_HOST_PASSWORD
}