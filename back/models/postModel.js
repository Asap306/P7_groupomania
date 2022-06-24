const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(db){
            db.post.belongsTo(db.user);
            db.post.hasMany(db.commentaire);
			db.post.hasMany(db.like);


        }
    }
    Post.init({
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		contenu: {
			allowNull: true,
			type: DataTypes.TEXT,
		},
		imageUrl: {
			allowNull: true,
			type: DataTypes.STRING
		},

		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
    }, 
    {
        //indique a squelize le nom de la table
        sequelize,
        modelName: "post"
    })
    return Post
    
};