var app = require('express')(),
    bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
        extended: false
}));

// 将要处理的逻辑交给具体的包来执行
app.use('/albums', require('./lib/routers/albums'));
app.use('/users', require('./lib/routers/users'));


app.use('/*', function(req, res, next) {
    res.status(404).send('Not Found.');
});

app.listen(3000)
