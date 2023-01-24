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

app.use(express.static('./frontend'))

app.get('/', (req, res) => res.render('index'))

let data = JSON.parse(fs.readFileSync(filePath,'utf8')) 

app.post('/order', (req,res) =>{
  let package = {}
  let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  let time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  Object.assign(package, { date }, { time }, req.body)
  data.order.push(package)
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err){
          return res.status(500).send(err)
        }
        res.send(req.body)
    console.log(req.body)
})
})

app.listen(7000)