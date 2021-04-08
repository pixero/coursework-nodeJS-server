const jwt = require('jsonwebtoken');


const findUserByName = async (db,currentName) =>{
     return await db.collection('users').findOne({username:currentName});
}

module.exports = (app,db)=>{
    app.post('/auth',(req,res)=>{
        const token = jwt.sign({
            data: `${req.body.name},${req.body.password}`
        },'secret');
        res.send(token);
    })

    app.post('/registration',async (req,res)=>{
        const note = { username: req.body.username, password: req.body.password };
        const user = await findUserByName(db,note.username);
        console.log(user);
        if(!user) {
            db.collection('users').insert(note, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(true);
                }
            });
        } else {
            res.status(400);
            res.send({"message":"Пользователь с таким именем уже существует"})
        }
    })
}

