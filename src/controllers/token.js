const jwt =require("jsonwebtoken");

const verificar=(req, res, next)=>{
    const token =req.headers.authorization;

    if(!token){
        return res.status(401).json({mensaje:"no hay token"});
    }
    const partes=token.split(" ");

    if(partes.length !== 2 || partes[0] !== "Bearer"){
        return res.status(401).json({mensaje:"token mal formateado"});

    }

    const tokenjwt=partes[1];
    const clave="ESTE_ES_UN_SECRETO";

    jwt.verify(tokenjwt,clave, (err, decode)=>{
        if(err){
            return res.status(401).json({mensaje:"token invalido"});
        }

        req.usuario=decode;
        next();
    })

}



module.exports=verificar