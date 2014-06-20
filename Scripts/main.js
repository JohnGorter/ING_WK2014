
   var games = new Array();
   
    jQuery.support.cors = true;
    
    // Main
    $(function(){
        if (window.localStorage['games']) {
            games = JSON.parse(window.localStorage['games']);
            for (game in games)
                insertGame(games[game], false);
        }
        
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
             
             insertGame(game, true);
             
             games.push(game);
             window.localStorage['games'] = JSON.stringify(games);
             
           
        });
    });
    
    function insertGame(g, bShowAlert){
         var li = $("<li class='list-group-item'>");
            var datespan = $("<span class='date'>").text(g.date + " ");
            var titlespan = $("<span class='title'>").text(g.title + " ");
            var descspan = $("<span class='desc'>").text(g.description).addClass("hidden");
            var deletespan = $("<span class='delete glyphicon glyphicon-trash'>").html("&nbsp;&nbsp;").click(function(){
                $(this).parent().remove();
                });
            
            li.append(deletespan).append(datespan).append(titlespan).append(descspan).click(clickLI).appendTo($("#gamelist"));
            
            $("#game").val("");
            $("#description").val("");
            if (bShowAlert) {
              $("#panel").prepend('<div class="alert alert-success alert-dismissable" id="divalert"><button class="close" data-dismiss="alert">&times;</button>Wedstrijd is toegevoegd!</div>');
              $(".alert").delay(5000).fadeOut(200);
            }
    }
    
    function clickLI(){
        var title = $(".title",this).text().trim();
        var detailspanel = "<h2>" + title + "</h2><p>" + $(".desc", this).text() + "</p>";
        var videopanel = "<h1>" + title + "</h1><video autoplay controls style='width:100%;padding:10px;'><source src='./"+ title + ".mp4'></source></video>";
        
        
         $("#details").html(detailspanel);
         $("#video").html(videopanel);

    }
