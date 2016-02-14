var http = require('http');

var config = {
    hostname: 'localhost',
    port: 3000,
    path: '/users/adduser',
    method: 'POST',
    headers: {"Content-Type": "application/json"}
};


var req = http.request(config, function(res) {
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

user= {}
user.username="tiaraju25";
user.password="tiaraju";
req.write(JSON.stringify(user));
req.end();