const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    res.send(token)
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.id;
    console.log(id)
    
    if (req.body.id && req.body.id !== id) {
      throw 'User ID invalide !';
    } else {
      next(); 
    }
  } catch {
    res.status(403).json({ error: new Error ('Utilisateur non authorisée !') });
  }
};