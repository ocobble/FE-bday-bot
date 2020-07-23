var twit = require('twit');
var config = {
    consumer_secret: process.env.CONSUMER_SECRET,
    consumer_key: process.env.CONSUMER_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
}
var fs = require("fs");

var Twitter = new twit(config);

async function tweetBirthdays() {
var text = fs.readFileSync("./Characters.json", "utf-8");
var jsonText = JSON.parse(text);

var todayDate = new Date();
var counter = 0;

for (var i = 0; i < jsonText.Characters.length; ++i) {
    // Check if character's birthday is today
    //console.log(characterJSON.Birthday);
    var characterBD = new Date(jsonText.Characters[i].Birthday);
    if (todayDate.getDate() === characterBD.getDate() && todayDate.getMonth() === characterBD.getMonth()) {
        // If it is, tweet happy birthday
        console.log("Attempting to tweet");
        var index = i;
        
        // Tweet
        await tweet(jsonText.Characters[i].Name, jsonText.Characters[i].Picture);
        counter = counter + 1;
    }
}
if (counter == 0) {
    console.log("No birthdays today.");
}
}

function tweet(name, pictureString) {
    var imagePath = './Images/' + pictureString;
        var pic = fs.readFileSync(imagePath, { encoding: 'base64' })
 
        // first we must post the media to Twitter
        Twitter.post('media/upload', { media_data: pic }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string
        var altText = "A lovely picture of " + name;
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
 
        Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: "Happy birthday " + name + "!", media_ids: [mediaIdStr] }
 
                Twitter.post('statuses/update', params, function (err, data, response) {
                    console.log(data)
                })
            }
        })
    })
}
        
exports.tweetBirthdays = tweetBirthdays;
// Function call
//tweetBirthdays();
