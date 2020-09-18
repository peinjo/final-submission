var express = require('express');
var myApp = express.Router();
var dbConn  = require('../lib/db');
 
// Create a new Book
myApp.post('/create',function(req, res, next) {
  let name = req.body.name;
    let author = req.body.author;
    let editions = req.body.editions;

    res.send('books/add', {
      name: name,
      author: author,
      editions: editions
  })

  var form_data = {
    name: name,
    author: author,
    editions, editions
}

dbConn.query('INSERT INTO books SET ?', form_data, function(err, result){
  res.send('books/add', {
    name: form_data.name,
    author: form_data.author,
    editions: form_data.editions                   
})

}


});

// Retrieve all Books
myApp.get('/myApp', function(req, res) {
  dbConn.query('SELECT * FROM myApp',function(err, rows) {
   console.log(myApp || rows)
});
});

// Retrieve a single Book with Book Id
myApp.get('/myApp/:id', function(req, res) {
  dbConn.query('SELECT * FROM myApp WHERE BookID = ?',function(err, rows) {
    console.log(rows)
  })
});

// Update a book with book Id
myApp.put('/update/:id', function(req, res, next) {

  let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let editions = req.body.editions;

    var form_data = {
      name: name,
      author: author,
      editions: editions
  }

    res.send('myApp/:edit', {
      id: req.params.id,
      name: name,
      author: author,
      editions: editions
  })

  dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function(err, result) {
    res.render('books/edit', {
      id: req.params.id,
      name: form_data.name,
      author: form_data.author,
      editions: form_data.editions
  })
});

// Delete a book with book Id
myApp.delete('/myApp/:id', function(req, res) {

  let id = req.params.id;

  dbConn.query('DELETE FROM books WHERE id = ' + id, function(err, result) {
  
    }
)
});

module.exports = myApp;
