$(document).ready(function() {
    $(".btn").hover(function() {
      $(".btn").addClass("animated jello").css("background-color","#6d0d7a")
    })
  
    $.ajax({
        url:"https://api.fantasydata.net/v3/cbb/scores/JSON/LeagueHierarchy",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","345ec2b2ce2e41fe9d552aee5ca3deba");
        },
        type: "GET",
    })
    .done(function(data) {
        $("#topTeamsList").removeClass("spinner-grow mt-3 ml-5")
        var accTeams= data[2].Teams; //accTeams is array of objects that contain information about each team
        var apTeams = accTeams.filter(function(team){
          return team.ApRank !== null
        }).sort(function(a,b){
          return a.ApRank - b.ApRank
        })
        var nullTeams = accTeams.filter(function(team){
          return team.ApRank === null
        }).sort(function(a,b){
          return b.Wins - a.Wins
        })
        var allTeams = apTeams.concat(nullTeams)
        for (var i = 0; i < allTeams.length; i++) {
         
          var el = $("<li></li>").append(allTeams[i].School).data("school",allTeams[i].Key)
          var logo= $("<img />").attr("src",allTeams[i].TeamLogoUrl).css("width", "40px").css("margin-left","10px")
          $(el).append(logo);
          $(el).on("click", function(e) {
            $("#playersList").empty().addClass("spinner-grow mt-3 ml-5 ")
            var school= $(e.currentTarget).data().school
            $.ajax({
              url:"https://api.sportsdata.io/v3/cbb/scores/json/Players/"+school,
              beforeSend: function(xhrObj){
                  // Request headers
                  xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","345ec2b2ce2e41fe9d552aee5ca3deba");
              },
              type: "GET",

          
            }).done(function(data){
              console.log(data)
              $("#playersList").removeClass("spinner-grow mt-3 ml-5")
            })
          })
         
          $('#topTeamsOrderedList').append(el);
  
        }
    })
    .fail(function() {
        console.log("error");
    });
  });
  