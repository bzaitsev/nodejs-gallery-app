const cors = require('cors');
const express = require('express'); 
const config = require('./config');
 
const indexRouter = require('./routes/index');
const downloadRouter = require('./routes/download');
const uploadRouter = require('./routes/upload');

const app = express();
global.rootDirName = __dirname;

app 
  .set('view engine', 'ejs')
  .use(express.json())
  .use(express.static(config.staticPath))
  .use(cors())

  .use('/', indexRouter)
  .use('/download', downloadRouter)
  .use('/upload', uploadRouter)

app.listen(config.port, error => { 
  if (error) return console.error('Server start: ', error);   
  console.log(`Server is listening on port ${config.port}`);
});
