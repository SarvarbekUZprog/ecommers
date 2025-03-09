const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { PORT } = require('./src/data/config.js')
const sequelize = require('./src/data/database')
const bootstrap = require('./src/bootstrap')

const app = express()
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(express.json())
app.use(bodyParser.json())
app.use(cors());
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000 // 10 mb max limit
    },
    abortOnLimit: true
  })
)
bootstrap(app)


sequelize.sync({  }).then(() => {
  console.log("Database & User model synced!");
});
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`)
})