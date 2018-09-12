
var express = require('express'),
    app = express(),
    coinRoutes = express.Router();

var Coin = require('../models/coin');

coinRoutes
    .route('/add')
    .post(function(req,res){
        var coin = new Coin(req.body);
        coin.save()
            .then(item => {
                res.status(200).json({'coin': 'Coin added Successfully'});
            })
            .catch(err => {
                res.status(400).send('unable to save to database');
            });
    });
coinRoutes
    .route('/')
    .get(function(req,res){
        Coin.find(function (err, coins){
            if(err) { console.log(err) }
            else {
                res.json(coins);
            }
        });
    });
coinRoutes.route('/edit/:id')
    .get(function(req, res){
        var id = req.params.id;
        Coin.findById(id, function (err, coin){
            res.json(coin);
        })
    });
coinRoutes
    .route('/update/:id')
    .post(function(req, res) {
        var id = req.params.id;
        Coin.findById(id, function(err, coin) {
            if(!coin) {return next(new Error('could not load document'))}
            else{
                coin.name = req.body.name;
                coin.price = req.body.price;
   
                coin.save()
                    .then(coin => {
                        res.json('update completed');
                    })
                    .catch(err => {
                        res.status(400).send('unable to update the database');
                    })
            }
        })
    });
coinRoutes
    .route('/delete/:id')
    .get(function(req, res) {
        Coin.findByIdAndRemove({ _id : req.params.id},
            function(err, coin){
                if(err) res.json(err)
                else res.json('Successfully Removed');
            });
    });

module.exports = coinRoutes;
