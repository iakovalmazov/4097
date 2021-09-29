const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/correct', (req, res) => {
  res.send(
  `
  <h4>Все верно! Преподавателя зовут Алексей Локтев</h4>
  <a href="/">Попробовать еще раз</a>
  `
  )
})

app.get('/', (req,res) => {
  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>4097</title>
    </head>
    <body>
      <h1>Как зовут преподавателя?</h1>
      <form method="POST" action="/checkKnowledge">
        <label for="name">Имя</label>
        <input id="name" name="name" type="text">
        <label for="surname">Фамилия</label>
        <input id="surname" name="surname" type="text">
        <button type="submit">Проверить знания</button>
      </form>
    </body>
    </html>`
  )
})

app.post('/checkKnowledge', (req, res) => {
  let mistake = ''
  if(req.body.name || req.body.surname) mistake = 'Неверно!'
  if(req.body.name === 'Алексей' && req.body.surname === 'Локтев') {
    res.redirect('/correct')
  } else {
    res.send(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>4097</title>
      </head>
      <body>
        <h1>Как зовут преподавателя?</h1>
        <form method="POST">
          <label for="name">Имя</label>
          <input id="name" name="name" type="text" value="${req.body.name || ''}">
          <label for="surname">Фамилия</label>
          <input id="surname" name="surname" type="text" value="${req.body.surname || ''}">
          <button type="submit">Проверить знания</button>
        </form>
        <h1>${mistake}</h1>
      </body>
      </html>`
    )
  }
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
  console.log('server is running')
})