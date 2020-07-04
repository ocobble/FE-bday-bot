var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',  // REQUIRED
        lang: 'en'
}
}

Twitter.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    console.log(data)
  })
