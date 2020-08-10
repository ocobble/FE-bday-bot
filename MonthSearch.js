var fs = require("fs");

function monthSearch(month) {
    // Find out which characters have birthdays this month:
    var text = fs.readFileSync("./Characters.json", "utf-8");
    var jsonText = JSON.parse(text);

    console.log("Birthdays this month: ");
    for (var i = 0; i < jsonText.Characters.length; ++i) {
        var characterBD = new Date(jsonText.Characters[i].Birthday);
        if (characterBD.getMonth() == month) {
            console.log(jsonText.Characters[i].Name + ": "  + characterBD.getDate());
        }
    }
}
today = new Date();
todayMonth = today.getMonth();
monthSearch(todayMonth);