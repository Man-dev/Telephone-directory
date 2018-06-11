var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('contact', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: ["^[a-z]+$",'i']
			}
		},
		number: {
			type: DataTypes.INTEGER,
			validate: {
				not: ["[a-z]",'i'],
				len: [5,15]
			}
		}
	});
}