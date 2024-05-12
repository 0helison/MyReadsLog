const express = require('express')

const pool = require('./db/conn')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/vetclinic', function (req, res) {
    res.render('register')
})

app.post('/vetclinic/tutor', (req, res) => {

    const dadosDoReq = req.body
    
    await TutorModel.create(dadosDoReq)

})

console.log("----------------------------------------------------------")

app.get('/books', (req, res) => {

    const sql = 'SELECT * FROM books'
  
    pool.query(sql, function(err, data) {  
        if (err) {
            console.log(err)
            return
        }
  
        const books = data

        res.render('books', {books})
    })
})

app.get('/book/edit/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]
  
    pool.query(sql, data, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0] 

        res.render('editbook', {book})
    })
})

app.post('/book/updatebook', (req, res) => {

    const id = req.body.id
    const book_name = req.body.book_name
    const author = req.body.author
    const total_pages = req.body.total_pages
  
    const sql = `UPDATE books SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['book_name', book_name, 'author', author, 'total_pages', total_pages, 'id', id]
  
    pool.query(sql, data,  function (err) {
  
      if (err) {
        console.log(err)
        return
      }
  
      res.redirect('/books')
    })
  })

  app.post('/book/remove/:id', (req, res) => {

    const id = req.params.id
  
    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]
  
    pool.query(sql, data, function (err) {
        if (err) {
            console.log(err)
            return
        }
  
        res.redirect('/books')
    })
})

app.listen(3000)
