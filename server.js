var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'covid'
});

var app = express()
app.use(cors())
app.use(express.json())



app.get('/users', function (req, res, next) {
    connection.query(
      'SELECT * FROM `user`',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })

  app.post('/users/create', function (req, res, next) {
    connection.query(
      'INSERT INTO `user`(`fullname`, `age`, `tel`, `status`) VALUES (?, ?, ?, ?)',
      [req.body.fullname, req.body.age, req.body.tel, req.body.status],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.put('/users/update/:id', function (req, res, next) {
    connection.query(
      'UPDATE `user` SET `fullname`= ?, `age`= ?, `tel`= ?, `status`= ? WHERE id = ?',
      [req.body.fullname, req.body.age, req.body.tel, req.body.status,req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })


  
  app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM `user` WHERE `id` = ?',
      [id],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.delete('/del', function (req, res, next) {
    connection.query(
      'DELETE FROM `user` WHERE id = ?',
      [req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })



app.listen(5000, function () {
  console.log('web server listening on port 5000')
})