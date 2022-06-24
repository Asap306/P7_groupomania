const db = require('../models/index');
const Post = db.post;
const User = db.user;
const Commentaire = db.commentaire;
const Like = db.like;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const commentaire = require('../models/commentaire');
const { like } = require('../models/index');

exports.createPost = (req, res, next) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "impossible de publier un message vide !"
        });
        return
    }
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
   
    Post.create({
        contenu: req.body.content,
        userId: req.body.userId,
        imageUrl: imageUrl
    })
    .then(user => {
        res.send({
            message: "Post enregistré avec succès",
        })
    })
    .catch(error => {res.status(500).send(error.message)}); 
};

exports.updatePost = (req, res, next) => {
   
    let imageUrl = null;
    let content = null;
    if (req.file) {
        Post.update({
            contenu: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }, {where : {id : req.params.id}})
        .then(user => {
            res.send({
                message: "Post modifié avec succès",
            })
        })
        .catch(error => {res.status(500).send(error.message)}); 
    }else{
        Post.update({
            contenu: req.body.content,
        }, {where : {id : req.params.id}})
        .then(user => {
            res.send({
                message: "Post Modifié avec succès",
            })
        })
        .catch(error => {res.status(500).send(error.message)}); 
    }
   
   
};

exports.deletePost = (req, res) => {
    Post.destroy({where: {id: req.body.postId}})
    .then(() => {
        res.send({
            message: "Post supprimé avec succès"
        })
    })
    .catch(error => {res.status(500).send(error.message)}); 
};

exports.liker = (req, res) => {
    Like.create({
        postId: req.body.postId,
        userId: req.body.userId,
    })
    .then(() => {
        res.send({
            message: "like enregistré avec succes"
        })
    })
    .catch(error => {res.status(500).send(error.message)}); 
};
exports.disliker = (req, res) => {
    Like.destroy({where: {postId: req.body.postId,
        userId: req.body.userId,}})
    .then(() => {
        res.send({
            message: "like annulé avec succes"
        })
    })
    .catch(error => {res.status(500).send(error.message)}); 
};

exports.createComment = (req, res, next) => {
    console.log(req.body)
    if (!req.body.texte) {
        res.status(400).send({
            message: "impossible de publier un commentaire vide !"
        });
        return
    }
    Commentaire.create({
        texte: req.body.texte,
        userId: req.body.userId,
        postId: req.body.postId,
    })
    .then(user => {
        res.send({
            message: "Post enregistré avec succès",
        })
    })
    .catch(error => {res.status(500).send(error.message)}); 
};


exports.getAllPost = (req, res) => {
    Post.findAll({
        include: [User,
            { model: db.commentaire, include: User},
            {model: db.like, include: User}
        ],
        order: [
            ['id', 'DESC'],
        ],
    })
    .then(allPost => res.status(200).json(allPost))
    .catch(error => res.status(500).json(error));
};
