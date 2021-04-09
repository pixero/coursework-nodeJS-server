const jwt = require('jsonwebtoken');


const findUserByName = async (db,currentEmail) =>{
     return await db.collection('users').findOne({email:currentEmail});
}
const generateAccessToken = (user)=>{
    const token = jwt.sign({_id:user._id}, 'secret');
    return token;
}
const  authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, 'secret' , (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}
const createUser = (conditions,user)=>{
    if(!conditions) {
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(true);
            }
        });
    } else {
        res.status(400);
        res.send({"message":"Пользователь с такими данными уже существует"})
    }
}


module.exports = (app,db)=>{

    app.post('/auth',async (req,res)=>{
        const note = { email: req.body.email, password: req.body.password };
        const user = await findUserByName(db,note.email);
        if(user && user.password === note.password) {
            res.send(generateAccessToken(user));
        }else{
            res.status(400);
            res.send({"message":"Не корректные данные"})
        }
    })

    app.get('/credentials',authenticateToken,async (req,res)=>{
            res.send(true);
    })

    app.post('/registration',async (req,res)=>{
        const  newUserData = { email: req.body.email, password: req.body.password };
        const oldUser = await findUserByName(db,note.email);
        console.log(user);

        //user - условие, чтобы проверить, что такого пользователя нет
        //note - данные нового пользователя
        createUser(oldUser,newUserData);
    })
}
