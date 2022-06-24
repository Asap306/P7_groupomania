   const db = require('../models/index');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        res.send({
            message: "Utilisateur enregistré avec succés",
        })
    })
    .catch(error => {res.status(500).send(error.message)}); 
};

exports.login = (req, res) => {
    User.findOne({where: { email: req.body.email }})
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: "Mot de passe incorrect !"})
            }
            res.status(200).json({ 
                id: user.id,
                username: user.username,
                email: user.email,
                is_admin: user.is_admin,
                token: jwt.sign(
                    { id : user.id },
                    process.env.TOKEN,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => {res.status(500).send(error.message)}); 
    })
    .catch(error => {res.status(500).send(error.message)}); 
};
