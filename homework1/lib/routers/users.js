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
        var ageAvg=(ageTot/usersModel.length).toString();
        res.send(ageAvg);
    });

r.route('/count/:sex')
    .get(function(req, res, next){
        var sex=req.params.sex;
        var count = 0;
        if (sex == 'male' || sex == 'female') {
            for (var i = 0; i < usersModel.length; i++) {
                if (usersModel[i].sex == sex) {
                    count++;
                }
            }
            var final=count.toString()
            res.send(final);
        } else {
            res.send('Input male or female.');
        }

    });

r.route('/search')
    .get(function(req,res,next){
        var company=req.query.company.toLowerCase();
        var user = [];
        for (var i=0; i < usersModel.length; i++){
            var indexedcompany=usersModel[i].company.toLowerCase();
            if (indexedcompany.indexOf(company)!==-1) {
               var result=usersModel[i].firstName
               user.push(result);
          }
      }

      if (user.length!==0){
          res.send(user);
      } else {
          res.status(404).send('User is not found!');
      }

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


module.exports = r;
