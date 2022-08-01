const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes');


const app = express();


var cors = require('cors');
app.use(cors());
app.use(cors({origin: true, credentials: true}));


app.set('port', process.env.port || 9000);

const dbOptions = {
    host: '127.0.0.1',
    user: 'root',
    password: '1000379989',
    database: 'frigorifico'
}

//middleware
app.use(myconn(mysql, dbOptions, 'single'))

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


/*---------------------------- POST -----------------------------*/

routes.post('', (req,res)=>{
  
})





app.use('/' , routes);


//server running
app.listen(app.get('port'), () => {
    console.log('el servidor esta corriendo en el puerto', app.get('port'));
})
