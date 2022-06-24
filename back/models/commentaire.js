//----------------------------------------------------------------------------------
// Modèle commentaire
//----------------------------------------------------------------------------------
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    
    //le fichier "models/index" va appeler cette méthode automatiquement

    static associate(db) {
      // define association here
      db.commentaire.belongsTo(db.post, {
        onDelete: "CASCADE"
      });
      db.commentaire.belongsTo(db.user, {
        onDelete: "CASCADE"
      });
    }
  }
  Commentaire.init(
    {
      texte: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "commentaire",
    }
  );
  return Commentaire;
}