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

var todayDate = new Date(); //TODO: This is wrong
var counter = 0;

for (var i = 0; i < jsonText.Characters.length; ++i) {
    // Check if character's birthday is today
    //console.log(characterJSON.Birthday);
    var characterBD = new Date(jsonText.Characters[i].Birthday);
    if (todayDate.getDate() === characterBD.getDate() && todayDate.getMonth() === characterBD.getMonth()) {
        // If it is, tweet happy birthday
        console.log("Attempting to tweet");
        var index = i;
        var imagePath = './images/' + jsonText.Characters[index].Picture;
        var pic = fs.readFileSync(imagePath, { encoding: 'base64' })
 
        // first we must post the media to Twitter
        Twitter.post('media/upload', { media_data: pic }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string
        console.log(i);
        var altText = "A lovely picture of " + jsonText.Characters[index].Name;
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
 
        Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: "Happy birthday " + jsonText.Characters[index].Name + "!", media_ids: [mediaIdStr] }
 
                Twitter.post('statuses/update', params, function (err, data, response) {
                console.log(data)
            })
        }
    })
    })
        counter = counter + 1;
    }
}

if (counter == 0) {
    console.log("No birthdays today.");
}

