var r = require('express').Router()
    albumsModel = require('../models/albums.js');

r.route('/')
    .get(function(req, res, next){
        res.send(albumsModel);
    });

r.route('/longerSong')
    .get(function(req, res, next){
        var longerSong=albumsModel.filter(function(album){
            return album.length>180;
        })
        res.send(longerSong);
    });

r.route('/singer/:name')
    .get(function(req, res, next){
        var name=req.params.name;
        var album=[];
        for(var i=0; i<albumsModel.length; i++){
            if(albumsModel[i].singer==name){
                album.push(albumsModel[i]);
            }
        }
        if(album.length !== 0){
            res.send(album);
        }else{
            res.status(404).send('Album is not found!');
        }
    });

r.route('/search')
    .get(function(req, res, next){
        var type=req.query.type;
        var album=[];
        for(var i=0; i<albumsModel.length; i++){
            if(albumsModel[i].type==type){
                album.push(albumsModel[i]);

            }
        }
        if(album.length!==0){
            res.send(album);
        }else{
            res.status(404).send('Album is not found!');
        }
    });

    r.route('/:id')
        .get(function(req, res, next){
            var id=req.params.id-1
            if(id>=0 && id<=albumsModel.length){
                res.send(albumsModel[id]);
            }else{
                res.status(404).send('Album is not found!')
            }
        });

    r.route('/:id')
        .put(function(req, res, next){
            var id=req.params.id-1
            if(id>=0 && id<=usersModel.length){
                albumsModel[id].length=parseInt(req.body.length);
                albumsModel[id].title=req.body.title;
                res.send(albumsModel[id]);
            }else{
                res.status(404).send('Album is not found!');
            }
        });



module.exports = r;
