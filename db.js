var Sequelize = require('sequelize');
var env = process.env.NODE || 'developement';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-telephone-directory.sqlite'
	});
}

var db = {};
db.contact = sequelize.import(__dirname + '/models/telephonedir.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
