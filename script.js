var idNumber = 1;
	var level = 1;
	var player = ('')
	
	var blockBuilder = function(blockId){
		
		
	
		var width = $('#game_area').width();
	
		var blockName = ('block'+blockId);
	
		$('#game_area').prepend('<div class = "block" id=' + blockName + '></div>');
		var color = getRandom(1,4);
		var blockWidth = $('#'+blockName).width();
		var gameWidth = (width - blockWidth);
		
		switch(color){
		
		case 1:
			$('#'+blockName).css("background-color","red");
			break;
		case 2:
			$('#'+blockName).css("background-color","green");	
			break;
		case 3:
			$('#'+blockName).css("background-color","gold");
			break;
		case 4:
			$('#'+blockName).css("background-color","blue");
			break;
		} // end color switch
		
		var setLeft = getRandom(1,gameWidth);
		
		 $('#'+blockName).css("left",+setLeft);
		
		$('#'+blockName).click(function(){
			$(this).hide('explode',{pieces:16},250,function(){levelUp(blockId);});
			
			
			
		}); // ends click and destroy	
	
		checkStatus(blockId);
		
		
	}; // end block builder

	
	var getPosition = function (blockId) {
		var blockName = ('#block'+blockId);
		var position = $(blockName).position().top;
		return position;
		
	
		
	};
	
	var checkStatus = function (blockId) {
		var gameHeight = $('#game_area').height();
		var blockName = ('#block'+blockId);
		var position = getPosition(blockId);
		var blockHeight = $(blockName).height();
		
		
		if (position >= (gameHeight-blockHeight)) {
		
			$('.block').stop().fadeOut('slow');
			alert('GAME OVER');
			
			
		}else{
		
			dropIt(blockId);
			
		}
	};
	
	var dropIt = function(blockId) {
		var blockName = ('#block'+blockId);
		var speed = 2;
		
		
		
		$(blockName).animate({top:'+='+speed},10,function(){checkStatus(blockId);});
			
		
		};
		
	
	var getRandom = function(min,max) {
		var number = Math.floor(Math.random() * (max - min + 1)) + min;
		return number;
		};
	
	
	var blockLauncher = function(level) {
	
		i = 0;
		
	
		var launch = function () {
		
			
			setTimeout(function(){ // loop repeats every half second
			
			var idNumber = i;
			var blockId = (''+idNumber);
		
			blockBuilder(blockId); // calls the function that creates the block
			i++;
			
			if(i<level) {
			launch();
			}
		
			},500)
		};
		
		launch();
			
	
	};// ends blockLauncher
	
	var levelUp = function(blockId) {
	
		$('#block'+blockId).remove();  // cleans up exploded blocks
		
		
		if ( $('#game_area').children().length <= 1 ) {  // checks to see if there are any blocks in the game_area.
			level++;
			$('#footer').html('<h2>Player: '+player+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level:' +level+'</h2>');  // updates the footer with the new level
			blockLauncher(level);
			} // end if
		}; // ends level up
	
$(document).ready(function() {
	


	$('#start_button').prop('disabled',true);
	

	$('#name_button').click(function(){


	player = prompt('Please enter your name');
	
	if(player !== ('')) {
	
		$('#start_button').prop('disabled',false);
		$('#name_button').effect("explode", 750,function(){$('#name_button').remove();});
		
		$('#footer').html('<h2>Player: '+player+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level:' +level+'</h2>');
		} else {
		
		player = prompt('Please enter your name');
	
	
	} // ends player name if else block
	
	
}); // ends name button click function

$('#start_button').click(function(){
	
		
		$('#start_button').effect('explode',750,function(){$('#start_button').remove();});

		alert('Click the blocks before they hit the bottom!');
	
		blockLauncher(level);

		
		
		}); // ends start button click



					
					
}); // ends document ready
