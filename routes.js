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




routes.post('/shop', (req,res)=>{
    req.getConnection((err , conn)=>{
        try {
            console.log(req.body)
            conn.query('INSERT INTO shoppingcart set ?',[req.body],(err , rows)=>{
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

module.exports = routes;