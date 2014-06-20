
   var games = new Array();
   
    jQuery.support.cors = true;
    
    // Main
    $(function(){
        if (window.localStorage['games']) {
            games = JSON.parse(window.localStorage['games']);
            for (game in games)
                insertGame(games[game], false, false);
        }
        
        // drag and drop support
        var list = document.getElementById("list");
        list.ondragover = function(){
            $("#list").addClass("hovering");
            return false;};
        
        list.ondragend = function(){
            $("#list").removeClass("hovering");
            return false;};
        
        list.ondrop = function(e){
            var reader = new FileReader();
            reader.onload = function (event) {
                var newgames = JSON.parse(event.target.result);
                for (game in newgames)
                    insertGame(newgames[game], false, true);
                
            };
            reader.readAsText(e.dataTransfer.files[0]);
            e.preventDefault();
            return false;
            };
        
        //$.ajax({ url:'http://www.johngorter.com/score/getscores', cache:false, success: function(data){ alert(JSON.stringify(data));}});
        
        var datestring = new Date().getFullYear() + "-0" + (new Date().getMonth() + 1) +"-" + new Date().getDate();
        $("#date").val(datestring);
        
        $("#btnSave").click(function(){
            if (!$("#myform").get(0).checkValidity()) {
                window.event.preventDefault();
                window.event.stopPropagation();
                
                return ;
            }
             var game = {
               title: $("#game").val(),
               description: $("#description").val(),
               date: $("#date").val()
             };
             
             insertGame(game, true, true);
        });
    });
    
    function deleteGame(g) {
        var currentgame = g;
        for (game in games) {
           if(games[game].title == currentgame.title) {
                 games.splice(game,1);
            }   
        }
        window.localStorage['games'] = JSON.stringify(games);
    }
    
    function insertGame(g, bShowAlert, bShouldStore){
        
         var li = $("<li class='list-group-item'>");
            var datespan = $("<span class='date'>").text(g.date + " ");
            var titlespan = $("<span class='title'>").text(g.title + " ");
            var descspan = $("<span class='desc'>").text(g.description).addClass("hidden");
            var deletespan = $("<span class='delete glyphicon glyphicon-trash'>").html("&nbsp;&nbsp;").bind("click", { game:g }, function(){
                $(this).parent().remove();
                deleteGame(g);
                });
            
            li.append(deletespan).append(datespan).append(titlespan).append(descspan).click(clickLI).appendTo($("#gamelist"));
            
            $("#game").val("");
            $("#description").val("");
            if (bShowAlert) {
              $("#panel").prepend('<div class="alert alert-success alert-dismissable" id="divalert"><button class="close" data-dismiss="alert">&times;</button>Wedstrijd is toegevoegd!</div>');
              $(".alert").delay(5000).fadeOut(200);
            }
            
            if (bShouldStore) {
                games.push(g);
                window.localStorage['games'] = JSON.stringify(games);
            }
    }
    
    function clickLI(){
        var title = $(".title",this).text().trim();
        var detailspanel = "<h2>" + title + "</h2><p>" + $(".desc", this).text() + "</p>";
        var videopanel = "<h1>" + title + "</h1><video autoplay controls style='width:100%;padding:10px;'><source src='./"+ title + ".mp4'></source></video>";
        
        
         $("#details").html(detailspanel);
         $("#video").html(videopanel);

    }
