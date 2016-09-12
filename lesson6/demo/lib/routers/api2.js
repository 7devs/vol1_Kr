var router = require('express').Router(),
    newsModel = require('../models/news.js');

  router.route('/')
    .get(function(req, res, next){
        // res.status(200).send('api2 is ready.'c
        res.status(200).send(newsModel);
    });


  router.route('/:id')
    .get(function(req,res,next){
      var id = req.params.id;
      if (newsModel[id-1]){
        res.status(200).send(newsModel[id-1]);
      } else {
        res.status(404).send('news not found.');
      }
    });

  router.route('/:id')
    .delete(function(req,res,next){
      var id = req.params.id;
      if (newsModel[id-1]){
        newsModel.splice(id-1,1);
        console.log(newsModel);
        res.status(200).end();
      } else {
        res.status(404).send('fail to delete.');
      }
  });

module.exports = router;
