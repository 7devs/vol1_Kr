var r = require('express').Router()
    usersModel = require('../models/users.js');

r.route('/')
    .get(function(req, res, next){
        res.send(usersModel);
    });

r.route('/ageAvg')
    .get(function(req, res, next){
        var ageTot=0;
        for(var i=0; i<usersModel.length; i++){
            ageTot+=usersModel[i].age;
        };
        var ageAvg=ageTot/usersModel.length;
        res.send('The result is'+' '+ageAvg);
    });

r.route('/:id')
    .get(function(req, res, next){
        var id=req.params.id-1;
        if(id>=0 && id<=usersModel.length){
            res.send(usersModel[id].firstName+' '+usersModel[id].lastName);
        }else{
            res.status(404).send('User is not found!');
        }
    });

r.route('/:id')
    .put(function(req, res, next){
        var id=req.params.id-1;
        if(id>=0 && id<=usersModel.length){
        var mAge=isNaN(req.body.age);
        if(mAge){
            res.send('This is not a number!');

        }else{
            usersModel[id].age=req.body.age;
            res.send(usersModel[id]);
        };
    }else{
        res.status(404).send('User is not found!')
    }
    });

r.route('/count/:sex')
    .get(function(req, res, next){
        var sex=req.params.sex;
        var maleNum=0;
        var femaleNum=0;
        for(var i=0; i<usersModel.length; i++){
            if(usersModel[i].sex=='male'){

                maleNum++;
            }else{

                femaleNum++;
            };
        }
        if(sex='male'){
            res.send('The male num is'+' '+maleNum);
        }else{
            res.send('The female num is'+' '+femaleNum);
        };
    });

r.route('/search')
    .get(function(req, res, next){
        var xxx=req.query.company;
        var user=[];
        for(var i=0; i<albumsModel.length; i++){
            var indexedcompany=(albumsModel[i].company).toLowerCase()
            if(indexedcompany.indexOf(xxx.toLowerCase())!==-1){
                album.push(albumsModel[i]);
            }
        }
        if(album.length!==0){
            res.send(user);
        }else {
            res.status(404).send('User is not found!');
        }
    });


module.exports = r;
