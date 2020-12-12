// here I will create the DOM variable
var elapsedTime = document.querySelector("#elapsed");
var homeTeamLogo = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamLogo = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatcheGoals = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");

// Build Match Tiles
function addMatchTile(data) {
  // create the match tile div
  var matchTile = document.createElement("div");
  matchTile.classList.add("match-tile"); // adds class to div

  // create home team box
  var homeTeam = document.createElement("div");
  homeTeam.classList.add("team");

  // Create Home Team Image and name
  var homeTileLogo = document.createElement("img");
  var homeTileName = document.createElement("p");
  homeTileLogo.src = data["teams"]["home"]["logo"];
  homeTileName.innerHTML = data["teams"]["home"]["name"];

  // create away team box
  var awayTeam = document.createElement("div");
  awayTeam.classList.add("team");

  // Create away Team Image and name
  var awayTileLogo = document.createElement("img");
  var awayTileName = document.createElement("p");
  awayTileLogo.src = data["teams"]["away"]["logo"];
  awayTileName.innerHTML = data["teams"]["away"]["name"];

  homeTeam.appendChild(homeTileLogo);
  homeTeam.appendChild(homeTileName);

  awayTeam.appendChild(awayTileLogo);
  awayTeam.appendChild(awayTileName);

  var score = document.createElement("p");
  score.innerHTML = data["goals"]["home"] + "  :  " + data["goals"]["away"];

  // append all the elements to the match tile
  matchTile.appendChild(homeTeam);
  matchTile.appendChild(score);
  matchTile.appendChild(awayTeam);

  matchTable.appendChild(matchTile);
}

function getData() {
  // we will get the data from football api
  // fetch("https://api-football-beta.p.rapidapi.com/fixtures", {
  fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    method: "GET",
    headers: {
      //   "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "c1817957e014be1ed97a2a97b7a4ef5f",
    },
  })
    .then((response) =>
      response.json().then((data) => {
        console.log(response);
        console.log(data);
        var matchesList = data["response"];

        var fixture = matchesList[0]["fixture"];
        var goals = matchesList[0]["goals"]; // return the goals data
        var teams = matchesList[0]["teams"]; // return the teams data

        // now lets render our data on the package
        elapsedTime.innerHTML = fixture["status"]["elapsed"] + "'";
        homeTeamLogo.src = teams["home"]["logo"];
        homeTeamName.innerHTML = teams["home"]["name"];
        awayTeamLogo.src = teams["away"]["logo"];
        awayTeamName.innerHTML = teams["home"]["name"];
        lastMatcheGoals.innerHTML = goals["home"] + "  :  " + goals["away"];

        // loop in our response data and render them in
        for (var i = 0; i < matchesList.length; i++) {
          addMatchTile(matchesList[i]);
        }
      })
    )
    .catch((err) => {
      console.error(err);
    });
}

getData();
