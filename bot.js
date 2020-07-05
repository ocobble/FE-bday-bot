var twit = require('twit');
var config = require('./config.js');
var fs = require("fs");

var Twitter = new twit(config);

var retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',  // REQUIRED
        lang: 'en'
}
}

var text = fs.readFileSync("./Characters.json", "utf-8");
var jsonText = JSON.parse(text);
console.log(jsonText.Characters[0].Name);

//Twitter.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
 //   console.log(data)
 // })
