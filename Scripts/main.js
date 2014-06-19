
    //jQuery.support.cors = true;
    // Main
    $(function(){
       // $.ajax({ url:'http://ip.jsontest.com/', cache:false, success: function(data){ alert(JSON.stringify(data));}});
        var datestring = new Date().getFullYear() + "-0" + (new Date().getMonth() + 1) +"-" + new Date().getDate();
        $("#date").val(datestring);
        
        $("#btnSave").click(function(){
            if (!$("#myform").get(0).checkValidity()) {
                window.event.preventDefault();
                window.event.stopPropagation();
                
                return ;
            }
                
            var li = $("<li class='list-group-item'>");
            var datespan = $("<span class='date'>").text($("#date").val() + " ");
            var titlespan = $("<span class='title'>").text($("#game").val() + " ");
            var descspan = $("<span class='desc'>").text($("#description").val()).addClass("hidden");
            var deletespan = $("<span class='delete glyphicon glyphicon-trash'>").html("&nbsp;&nbsp;").click(function(){
                $(this).parent().remove();
                });
            
            li.append(deletespan).append(datespan).append(titlespan).append(descspan).click(clickLI).appendTo($("#gamelist"));
            
            $("#game").val("");
            $("#panel").prepend('<div class="alert alert-success alert-dismissable" id="divalert"><button class="close" data-dismiss="alert">&times;</button>Wedstrijd is toegevoegd!</div>');
            $(".alert").delay(5000).fadeOut(200);
        });
    });
    
    function clickLI(){
        var detailspanel = "<h2>" + $(".title",this).text() + "</h2><p>" + $(".desc", this).text() + "</p>";
         $("#details").html(detailspanel);
    }
