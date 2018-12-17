// DB ===
const mysql = require('mysql');
let databaseName = 'sql7266134';
const database = mysql.createConnection({
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7266134',
  password: 'hCdRJzJXSu',
  database: databaseName,
  port: '3306'
});

database.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }  
  console.log('connected as id ' + database.threadId);
});

// database.query('INSERT INTO products (title) VALUES ("test");', (error, result) => {
//   if (error) {
//     console.log('query error', error);
//   }

//   console.log('query result', result);   
// });

// result type Array[Object]
database.query(`SELECT * FROM products;`, (error, result, fields) => { 
  if (error) {
    console.log('query error', error);
  }

  console.log('query result', result); 
});

database.end();