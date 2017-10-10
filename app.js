const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, function() {
	console.info('Example app listening on port 3000!');
});

app.use('/', express.static('dist/'));
