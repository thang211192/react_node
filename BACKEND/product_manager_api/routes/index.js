var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'thang@92',
  port: 5432,
})


/* GET home page. */
router.get('/', function (req, res, next) { });

// api get data from postgresql
router.get('/getdata', function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  pool.query('SELECT * FROM product_i', (err, ress) => {
    if (err) {
      console.log(err)
    }
    else {
      res.send(ress.rows);
    }
    //pool.end()
  })
});

router.get('/add', function (req, res, next) {
  res.render('add',{});
});

router.post('/add', function (req, res1, next) {
  // Website you wish to allow to connect
  res1.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res1.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res1.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res1.setHeader('Access-Control-Allow-Credentials', true);
  product_name = req.body.product_name;
  product_gia = req.body.product_gia
  product_link = req.body.product_link;
  console.log(product_name+product_gia+product_link)
  pool.query("INSERT INTO product_i (product_name,product_price,images) VALUES ($1,$2,$3)",
  [product_name,product_gia,product_link],(err,result) =>{
    if(err){
      res1.send("loi..................");
    }
    else{
      res1.send('Da them du lieu: ' + product_name+product_gia+product_link);
    }
  })
});
module.exports = router;
