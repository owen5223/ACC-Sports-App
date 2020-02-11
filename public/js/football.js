$(document).ready(function() {
  $(".btn").hover(function() {
    $(".btn").addClass("animated jello").css("background-color","#6d0d7a")
  })

  $.ajax({
      url:"https://api.fantasydata.net/v3/cfb/scores/JSON/LeagueHierarchy",
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c15330d0e4ec47dc975b075b08be37d5");
      },
      type: "GET",
  })
  .done(function(data) {
  
      $("#topTeamsList").removeClass("spinner-grow mt-3 ml-5")
      var accTeams= data[2].Teams.concat(data[3].Teams)//accTeams is array of objects that contain information about each team
      
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
       var schoolName = $("<span></span>").text(allTeams[i].School).css("cursor","pointer")
        var el = $("<li></li>").append(schoolName).data("school",allTeams[i].Key)
        var logo= $("<img />").attr("src",allTeams[i].TeamLogoUrl).css("width", "40px").css("margin-left","10px")
        $(el).append(logo);
        $(el).on("click", function(e) {
          $("#selectTeam").hide()
          $("#playersList").addClass("spinner-grow mt-3 ml-5 ")
          var school= $(e.currentTarget).data().school
          $.ajax({
            url:"https://api.sportsdata.io/v3/cfb/stats/json/Players/"+school,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c15330d0e4ec47dc975b075b08be37d5");
            },
            type: "GET",

        
          }).done(function(data){
            $("#playersList").removeClass("spinner-grow mt-3 ml-5")
            $("#playerTable").show();
            $("#playerRows").empty()
           
            for (var i = 0; i < data.length; i++) {
              var el = $("<tr></tr>");
              var jersey=$('<td></td>').text(data[i].Jersey);
              var first=$('<td></td>').text(data[i].FirstName);
              var lastName = $('<span></span>').text(data[i].LastName)
              var last=$('<td></td>').append(lastName)
              if(data[i].InjuryStatus){
                var injuryIcon=$('<img />').attr("src","../images/injurry.png").css("width", "40px").css("margin-left","10px")
                $(last).append(injuryIcon)
                $(injuryIcon).popover({title:"Injury Report",content:data[i].InjuryNotes});
              }
              var position=$('<td></td>').text(data[i].Position);
              var grade=$('<td></td>').text(data[i].Class);
              $(el).append(jersey).append(first).append(last).append(position).append(grade)
            $("#playerRows").append(el)

            }
          })
        })
       
        $('#topTeamsOrderedList').append(el);

      }
  })
  .fail(function() {
      console.log("error");
  });
});
