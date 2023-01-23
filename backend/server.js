const express = require('express')
const app = express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('views', './frontend')
const cors = require('cors')
const fs = require('fs')
const path = require("path");
const filePath = path.join(`${__dirname}/./order.json`)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('frontend'))

app.get('/', (req, res) => res.render('index'))

app.post('/order', (req,res) =>{
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err){
          return res.status(500).send(err)
        }
        res.send('Done')
    console.log(req.body)
})
})

app.listen(7000)