
    //jQuery.support.cors = true;
    // Main
    $(function(){
       // $.ajax({ url:'http://ip.jsontest.com/', cache:false, success: function(data){ alert(JSON.stringify(data));}});
        var datestring = new Date().getFullYear() + "-0" + (new Date().getMonth() + 1) +"-" + new Date().getDate();
        $("#date").val(datestring);
        
        $("#btnSave").click(function(){
            if ($("#game").val() == "" || $("#game").val() == "vul in") {
                $("#gamegroup").addClass("has-error");
                $("span", "#gamegroup").addClass("glyphicon-remove");
                return;
            }else{
                $("#gamegroup").removeClass("has-error");
                $("span", "#gamegroup").removeClass("glyphicon-remove");
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
            $("#form").append('<div class="alert alert-success alert-dismissable" id="divalert"><button class="close" data-dismiss="alert">&times;</button><strong>Toegevoegd</strong> Deze wedstrijd is toegevoegd!</div>');
            $(".alert").delay(2000).fadeOut(2000);
        });
    });
    
    function clickLI(){
        var detailspanel = "<h2>" + $(".title",this).text() + "</h2><p>" + $(".desc", this).text() + "</p>";
         $("#details").html(detailspanel);
    }
