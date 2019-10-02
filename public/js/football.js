$(document).ready(function() {
    $(".btn").hover(function() {
      $(".btn").addClass("animated jello").css("background-color","#6d0d7a")
    })
  
    $.ajax({
        url:"https://api.sportsdata.io/v3/cfb/scores/json/LeagueHierarchy",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c15330d0e4ec47dc975b075b08be37d5");
        },
        type: "GET",
    })
    .done(function(data) {
        var accTeams1= data[2].Teams; //accTeams is array of objects that contain information about each team
        var accTeams2= data[3].Teams 
        var apTeams1 = accTeams1.filter(function(team){
          return team.ApRank !== null
        })
        var apTeams2 = accTeams2.filter(function(team){
         return team.ApRank !== null
        })
        var apTeams = apTeams1.concat(apTeams2).sort(function(a,b){
          return a.ApRank - b.ApRank
        })
        var nullTeams1 = accTeams1.filter(function(team){
          return team.ApRank === null
        })
        var nullTeams2 = accTeams2.filter(function(team){
            return team.ApRank === null
          })
          var nullTeams = nullTeams1.concat(nullTeams2).sort(function(a,b){
          return b.Wins - a.Wins
        })
        var allTeams = apTeams.concat(nullTeams)
        for (var i = 0; i < allTeams.length; i++) {
          var el = $("<li></li>").append(allTeams[i].School)
          var logo= $("<img />").attr("src",allTeams[i].TeamLogoUrl).css("width", "40px").css("margin-left","10px")
          $(el).append(logo);
          $('#topTeamsOrderedList').append(el);
  
        }
    })
    .fail(function() {
        console.log("error");
    });
  });
  