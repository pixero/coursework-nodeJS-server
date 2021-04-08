const jwt = require('jsonwebtoken');


module.exports = (app,db)=>{
    app.post('/auth',(req,res)=>{
        console.log(req.body)
        const token = jwt.sign({
            data: `${req.body.name},${req.body.password}`
        },'secret');
        res.send(token);
    })

    app.post('/registration',(req,res)=>{
        res.send(true)
    })
}

