const jwt =require('jsonwebtoken');


module.exports = function(req,res,next){
    if(req.headers.authorization && req.headers.authorization.startsWith('bearer'))
    {
        const token = req.headers.authorization.split(' ')[1];
        if(token==null) res.sendStatus(401)
        jwt.verify(token,process.env.JSONWTPRIVATEKEY,(err,user)=>{
            if(err) res.sendStatus(403)
            req.user = user;
            next();
        });

    }else
    res.sendStatus(401)

}