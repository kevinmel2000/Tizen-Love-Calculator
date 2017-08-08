(function() {
    function launchApp() {
    	document.getElementById("img-load").src = "./image/loading_pink.gif";
		document.getElementById("img-load").style.display="block";
		var name1=document.getElementById("text-male").value;
		var name2=document.getElementById("text-female").value;
		
		$.ajax({
          url: "https://love-calculator.p.mashape.com/getPercentage?fname="+name1+"&sname="+name2,
          type: 'GET',
          dataType: 'json',
          headers: {
              "X-Mashape-Key": "your_key"
          },
          success: function(result) { 
        	  	$("#message-header").html(result.percentage+" %");
        	  	$("#message-content").html(result.result);
        	  	
        	  	var img_data="balloons.png";
        	  	if(result.percentage<50){
        	  		img_data="dislike.png";
        	  	}
        	  	else if(result.percentage>=50 && result.percentage <=75){
        	  		img_data="heart-sketch.png";
        	  	}
        	  	
	        	document.getElementById("img-load").src = "./image/"+img_data;
  	        	document.querySelector("#msg-box").style.display = "block";
          },
          error: function() { alert('Error, please check your internet connection!'); },
        });
		
//		$.getJSON("https://love-calculator.p.mashape.com/getPercentage?fname="+name1+"&sname="+name2, function(result){
//			$("#message-content").html(result.value);
//	        document.querySelector("#img-load").style.display = "none";
//		});
    }

    /**
     * Sets default event listeners
     * @private
     */
    function setDefaultEvents() {
        // Launch the Callee application when the Call button is clicked
        document.querySelector("#btn-check").addEventListener("click", launchApp);

        // Add eventListener for tizenhwkey
        document.addEventListener("tizenhwkey", function(e) {
            if (e.keyName === "back") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (error) {
                    console.error("getCurrentApplication(): " + error.message);
                }
            }
        });
    }

    /**
     * Initiates the application
     * @private
     */
    function init() {
        setDefaultEvents();
    }

    window.onload = init;
}());
