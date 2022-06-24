const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				is:/^[a-zA-ZÀ-ÿ\s_-]{2,60}$/
			}
		},
		email: {
			allowNull: false,
			unique : true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
        },
		job: {
			allowNull: true,
			type: DataTypes.STRING,
			validate: {
				is:/^[a-zA-ZÀ-ÿ\s_-]{2,60}$/
			}
		},
		is_admin: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
			defaultValue : false
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
        modelName: "user"
    })
    return User
    
};