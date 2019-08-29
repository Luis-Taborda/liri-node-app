require("dotenv").config()
require("moment")
var Spotify = require("node-spotify-api")
var axios =require("axios")
var fs = require("fs")
var keys = require("./keys.js")


var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

function runApp(userInput,userQuery){
    switch(userInput){
        case "concert-this":
            concertThis(userQuery)
            break;
        case "spotify-this":
            spotifyThis(userQuery)
            break;
        case "movie-this":
            movieThis(userQuery)
            break;
        case "do-this":
            doThis()
            break;
        default:
            console.log("I do not understand")
    }
}

function concertThis(artist){
    var bandSearch = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=54cb3e1bf47109588d446f2e35a05a2a"

    axios.get(bandSearch).then(
        function(response){
            console.log("Name of Venue: " + response.data[0].venue.name + "\r\n")
            console.log("Venue Location: " + response.data[0].venue.city + "\r\n")
            console.log("Date of Event: " + response.data[0].datetime + "\r\n")
        
        }
    )
   


}

function spotifyThis(songName){
    var spotify = new Spotify(keys.spotify)
    spotify.search({ type: 'track', query: songName , limit: 5 }, function(err, data) {
    
        if(err){
            return console.log("error: " + err)
        }

        for (let i = 0; i < 5; i++) {
            console.log("Artist Name " + data.tracks.items[0].album.artists[0].name + "\r\n")
            console.log("Song Name: " + data.tracks.items[0].name + "\r\n")
            console.log("song Link: " + data.tracks.items[0].href + "\r\n")
            console.log("Album: " + data.tracks.items[0].album.name + "\r\n")
    
            
        }

      
    
        
    })
  
    }

    function movieThis(movie){
        var movieSearch = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
  axios.get(movieSearch).then(
  function(response) {
    console.log("Title: " + response.data.Title + "\r\n")
    console.log("Year Released: " + response.data.Year + "\r\n")
    console.log("IMDB Rating: " + response.data.imdbRating + "\r\n")
    console.log("plot: " + response.data.Plot + "\r\n")
    console.log("Actors: " + response.data.Actors + "\r\n")
  })


    }

    function doThis(){
        fs.readFile("random.txt", "utf-8", function(err , data){
            if(err){
                return console.group(err)
            } else {
                console.log(data)

                var randomData = data.split(",")
                runApp(randomData[0], randomData[1])
            }
        })
    }

    runApp(userInput,userQuery)
       
                
            

            
     
