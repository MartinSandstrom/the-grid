const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen(1337, function() {
	console.info('Example app listening on port 1337!');
});

app.use('/', express.static('dist/'));
