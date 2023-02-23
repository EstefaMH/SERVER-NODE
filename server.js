require("dotenv").config();
const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes');
var body_parser = require('body-parser');


const app = express();
app.use(body_parser.urlencoded({extended:true}));

var cors = require('cors');
app.use(cors());
app.use(cors({origin: true, credentials: true}));


app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host: process.env.HOST || '127.0.0.1',
    user: process.env.USER ||'root',
    password: process.env.PASSWORD || '1000379989',
    database: process.env.DATABASE || 'frigorifico'
}

//middleware
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('aaa')
})





routes.get('/beef', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('SELECT * FROM products WHERE category = "beef"  ',(err , rows)=>{
                try {
                    res.json(rows);
                } catch (err) {
                    return res.send(err);
                }
            });
        } catch (err) {
            return res.send(err);
        }
    })
})


routes.get('/pork', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('SELECT * FROM products WHERE category = "pork"  ',(err , rows)=>{
                try {
                    res.json(rows);
                } catch (err) {
                    return res.send(err);
                }
            });
        } catch (err) {
            return res.send(err);
        }
    })
})


routes.get('/orders', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('SELECT * FROM orders  ',(err , rows)=>{
                try {
                    res.json(rows);
                } catch (err) {
                    return res.send(err);
                }
            });
        } catch (err) {
            return res.send(err);
        }
    })
})


routes.get('/products', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('SELECT * FROM products  ',(err , rows)=>{
                try {
                    res.json(rows);
                } catch (err) {
                    return res.send(err);
                }
            });
        } catch (err) {
            return res.send(err);
        }
    })
})

routes.get('/productid', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('SELECT * FROM products  ',(err , rows)=>{
                try {
                    res.json(rows);
                } catch (err) {
                    return res.send(err);
                }
            });
        } catch (err) {
            return res.send(err);
        }
    })
})


/*---------------------------- POST -----------------------------*/

routes.get('/', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('SELECT * FROM shoppingcart ',(err , rows)=>{
                try {
                    res.json(rows);
                    let shopingcart = new Object();
                    shopingcart.quantity = rows[0].quantity;
                    

                    console.log(shopingcart);
                                   

                } catch (err) {
                    return res.send(err);
                }
            });
        } catch (err) {
            return res.send(err);
        }
    })
})


routes.post('/products', (req,res)=>{
    collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
            let nombre = req.body.nombre || '';
            let quantity = req.body.quantity || '';  
            
        })
        .catch(error => console.error(error))
})







routes.post('/products', (req,res)=>{
    collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
})


routes.post('/orders', (req,res)=>{

    req.getConnection((err , conn)=>{
        try {
            console.log(req.body)
            conn.query('INSERT INTO orders set ?',[req.body],(err , rows)=>{
                try {
                    res.send('Registro exitoso');
                } catch (err) {
                    return res.send(err);
                }
            });
        } catch (err) {
            return res.send(err);
        }
    })
})



app.use('/' , routes);


//server running
app.listen(app.get('port'), () => {
    console.log('el servidor esta corriendo en el puerto', app.get('port'));
})
