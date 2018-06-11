var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();
PORT = process.env.PORT || 3000;
var contacts = [];

//MiddleWare//
app.use(bodyParser.json());


app.get('/', function(req, res) {
	res.send('Telephone directory root');
});

app.get('/contacts', function(req, res) {
	db.contact.findAll().then(function(contacts) {
		res.json(contacts);
	}, function(e) {
		res.json(e);
	});
});

app.post('/contacts', function(req, res) {
	var body = _.pick(req.body, 'name', 'number');
	var contacts = db.contact;

	contacts.create(body).then(function(contact) {
		res.json(contact);
	}, function(e) {
		res.json(e.errors[0].message);
	});

});



app.put('/contact/:id', function(req, res) {
	var id = parseInt(req.params.id, 10);
	var body = _.pick(req.body, 'name', 'number');
	var attributes = {};

	if (body.hasOwnProperty('name')) {
		attributes.name = body.name;
	}

	if (body.hasOwnProperty('number')) {
		attributes.number = body.number;
	}

	db.contact.findById(id).then(function(contact) {
		if (!contact) {
			res.status(400).send('Entry corresponding to queried id doesn\'t exist.');
		} else {
			contact.update(attributes).then(function(newContact) {
				res.json(newContact);
			}, function(e) {
				res.status(400).json(e);
			});
		}
	}, function(e) {
		res.status(404).json(e);
	});


});

app.delete('/contact/:id', function(req, res) {
	var id = parseInt(req.params.id, 10);
	db.contact.destroy({
		where: {
			id: id
		}
	}).then(function(n) {
		if (n === 0) {
			res.status(400).send('Entry corresponding to queried id doesn\'t exist.');
		} else {
			res.send('Delete query successful.');
		}
	});
});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Telephone directory server listening ' +
			'on PORT: ' + PORT + ' ! Press Ctrl+C to exit');
	});
});