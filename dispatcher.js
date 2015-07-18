/**
 * Created by JohnYeg on 7/18/15.
 */


var postData = querystring.stringify({
	'msg' : 'Hello World!'
});

var options = {
	hostname: 'www.google.com',
	port: 80,
	path: '/upload',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	}
};

var req = http.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	});
});

req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();