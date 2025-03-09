const express = require('express')
const userRouter = require('./user/routes/user.routes');
const productRouter = require('./product/routes/product.routes');

/*
* @param {express} app
* @return {null}
*/
function bootstrap(app) {
	app.use('/api/user', userRouter);
	app.use('/api/product', productRouter);
}

module.exports = bootstrap;