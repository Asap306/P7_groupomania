//----------------------------------------------------------------------------------
// Modèle like
//----------------------------------------------------------------------------------
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    
    //le fichier "models/index" va appeler cette méthode automatiquement

    static associate(db) {
      // define association here
      db.like.belongsTo(db.post, {
        onDelete: "CASCADE"
      });
      db.like.belongsTo(db.user, {
        onDelete: "CASCADE"
      });
    }
  }
  Like.init({},
    {
      sequelize,
      modelName: "like",
    }
  );
  return Like;
}
