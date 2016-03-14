var http = require('http');
http.get("http://localhost:3000/orders/order/56e6cc0ba71a502c1ea68970", function(res) {
    console.log("Got response: " + res.statusCode);

    res.on("data", function(data){
        console.log("Data response: " + data);
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});