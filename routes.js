const express = require('express');
const routes = express.Router();

routes.get('/api', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('SELECT * FROM products WHERE ref = 1001 ',(err , rows)=>{
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



routes.post('/', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            conn.query('INSERT INTO products (ref , nombre , price , initial_stock , entry , output) values (02,"costillas de cerdo", 18000 , 500 , 100 , 300)',(err , rows)=>{
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

module.exports = routes ;