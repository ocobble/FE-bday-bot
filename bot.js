var twit = require(’twit’);
var config = require(’./config.js’);

var Twitter = new twit(config);

var retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',  // REQUIRED
        lang: 'en'
}

Twitter.post('statuses/update', {
                status: 'happy birthday!'
            }, function(err, data, response) {
                if (response) {
                    console.log('Tweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
