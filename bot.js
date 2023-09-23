var fs = require("fs");
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
    appKey: process.env.CONSUMER_KEY,
    appSecret: process.env.CONSUMER_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    bearerToken: process.env.BEARER_TOKEN
});

const rwClient = client.readWrite;

// const textTweet = async () => {
//     try {
//       await rwClient.v2.tweet(
//           "This tweet has been created using nodejs");
//       console.log("success");
//     } catch (error) {
//       console.error(error);
//     }
// };

//textTweet();

const postTweet = async (name, pictureString) => {
    try {
      var imagePath = './Images/' + pictureString;
      //var pic = fs.readFileSync(imagePath, { encoding: 'base64' })
      const mediaId = await client.v1.uploadMedia(imagePath);
      // var altText = "A lovely picture of " + name;
      //var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
      await rwClient.v2.tweet({
            text: "Happy birthday " + name + "!",
            media: { media_ids: [mediaId] },
      });
      console.log("success");
    } catch (e) {
      console.error(e);
    }
};

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
            await postTweet(jsonText.Characters[i].Name, jsonText.Characters[i].Picture);
            counter = counter + 1;
        }
    }
    if (counter == 0) {
        console.log("No birthdays today.");
    }
    const { data } = await client.get('tweets', { ids: '1228393702244134912' });
    console.log(data);
}

// function tweet(name, pictureString) {
//     var imagePath = './Images/' + pictureString;
//         var pic = fs.readFileSync(imagePath, { encoding: 'base64' })
 
//         // first we must post the media to Twitter
//         Twitter.post('media/upload', { media_data: pic }, function (err, data, response) {
//         // now we can assign alt text to the media, for use by screen readers and
//         // other text-based presentations and interpreters
//         var mediaIdStr = data.media_id_string
//         var altText = "A lovely picture of " + name;
//         var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
 
//         Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
//             if (!err) {
//                 // now we can reference the media and post a tweet (media will attach to the tweet)
//                 var params = { status: "Happy birthday " + name + "!", media_ids: [mediaIdStr] }
 
//                 Twitter.post('statuses/update', params, function (err, data, response) {
//                     console.log(data)
//                 })
//             }
//         })
//     })
// }
        
exports.tweetBirthdays = tweetBirthdays;
// Function call
//tweetBirthdays();
