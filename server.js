var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
	if (request.method === 'GET'){
	   if(request.url === '/listings') {
			response.end(JSON.stringify(listingData));
		} else {
			response.statusCode = 404;
			response.end('Bad gateway error');
		}
	}
	response.statusCode = 404;
	response.end('Bad gateway error');

};

fs.readFile('listings.json', 'utf8', function(err, data) {
	if (err) throw err
    listingData = JSON.parse(data);
	http.createServer(requestHandler).listen(8080);
	console.log("server listening on: http://localhost:8080");
});
