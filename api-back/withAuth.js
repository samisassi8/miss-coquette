const jwt = require('jsonwebtoken');
const secret = 'grosminet';

const withAuth = (req, res, next)=> {
    // return next()
    // on récupère notre token dans le header de la requète HTTP
    const token = req.headers['x-access-token'];
    //si il ne le trouve pas
    if ( token === undefined) {
      //renvoi d'une erreur
        res.json({
          status: 404,
          msg: "token not found"
        })
    } else {
      //sinon (trouvé) utilisation de la fonction de vérification de jsonwebtoken.
        jwt.verify(token, secret, (err, decoded)=>{
          //si il y'a une erreur envoi d'une rep d'erreur
            if(err) {
                res.json({
                  status: 401,
                  msg: "error, your token is invalid"
                })
            //sinon envoi de l'id décodé dans le payload du token
            } else {
                req.id = decoded.id;
                //on sort de la fonction
                next();//il passe à la suite dans checkToken
            }
        })
    }
}

module.exports = withAuth;