const config = require('../dbConfig');
const Sequelize = require('sequelize');

const connexion = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: config.dialect,
      operatorsAliases: 0,
  
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );

const db = {};

db.Sequelize = Sequelize;
db.connexion = connexion;
db.user = require('./usersModel')(connexion, Sequelize);
db.post = require('./postModel')(connexion, Sequelize);
db.commentaire = require('./commentaire')(connexion, Sequelize);
db.like = require('./likeModel')(connexion, Sequelize);

db.post.associate(db);
db.commentaire.associate(db);
db.like.associate(db);


module.exports = db;