// console.log("this is working");

var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// var omdb = require('omdb');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

var spotify = new Spotify({
    id: 'ef36a0befa984f448642443ad3678eea',
    secret: '3924dc5d2a204ef8a978a9cedf9267ea'
});

function log() {

    fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function(err) {

        if (err) {
            console.log(err);
        } else {}

    });
};

var keys = require('./keys.js');

var client = new Twitter(keys.twitterKeys);

var params = { screen_name: 'pgtbootcamp' };

run();

function run() {

};

if (input1 === "my-tweets") {

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("");
            console.log('My Last Few Tweets: ');
            console.log('--------------------------');
            tweets.forEach(function(individualTweet) {
                console.log('Time Posted: ' + individualTweet.created_at);
                console.log('Tweet: ' + individualTweet.text);
                console.log('--------------------------');
                console.log("");


            });

        } else {
            console.log(error);
        };
    });

    log();


} else if (input1 === "spotify-this-song") {

    if (input2.length < 1) {

        input2 = "The Sign Ace of Base";
    };

    spotify.search({ type: 'track', query: input2 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("");
        console.log('Spotify Song Results: ');
        console.log('--------------------------');
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Track Title: " + data.tracks.items[0].name);
        console.log("Link to Song: " + data.tracks.items[0].preview_url);
        console.log("Album Title: " + data.tracks.items[0].album.name);
        console.log('--------------------------');
        console.log("");
    });

    log();

} else if (input1 === "movie-this") {

    if (input2.length < 1) {

        input2 = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix!");
    };

    request("http://www.omdbapi.com/?t=" + input2 + "&apikey=40e9cece", function(error, response, body) {
        console.log("");
        console.log("Movie Search Results");
        console.log('--------------------------');
        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
        console.log('--------------------------');
        console.log("");
    });

    log();

} else if (input1 === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        // console.log(data);

        var arr = data.split(",");

        input1 = arr[0].trim();
        input2 = arr[1].trim();
        run();
    });
};