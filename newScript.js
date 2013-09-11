var idNumber = 1;
var level = 1;
var player = ('')

var gameWidth = function() {
	var width = $('#game_area').width();
	return width;
}

var gameHeight = function() {
	var height =$('#game_area').height();
	return height;
}


var blockName = function(blockID){
	var name = ('block' + blockID);
	return name;
}

var getRandom = function(min,max) {
		var number = Math.floor(Math.random() * (max - min + 1)) + min;
		return number;
		};
		
var getColor = function() {

	var getColor = 'black';
	switch(getRandom(1,4);){
		
		case 1:
			color = 'red';
			break;
		case 2:
			color = 'green';	
			break;
		case 3:
			color = 'gold';
			break;
		case 4:
			$color = 'blue';
			break;
		}
		
		return color;
}

var setLeft = function() {
	var gameWidth = gameWidth();
	var position = getRandom(1,gameWidth);
	return position;
}

		
var blockLauncher = function () {

	var i = 0;
	var blockName = blockName();
	
		var launch = function () {
		
			
			setTimeout(function(){ // loop repeats every half second
			
			idNumber = i;
		
			blockBuilder(); // calls the function that creates the block
			
			i++;
			
			if(i<level) {
			launch();
			}
		
			},500)
		}	
}

var blockName = function(){
	var name = ('block'+idNumber);
	return name;
}

var blockBuilder = function(){

	// creates the block, and assigns css properties for color and position as well as the click and explode feature, then starts the game loop.
	
	var blockName = '#'+blockName();
	var color = getColor();
	var setLeft = setLeft();
	
	
	$('#game_area').prepend('<div class = "block" id=' + blockName + '></div>');
	
	$(blockName).css("background-color",getColor();)
	
	$(blockName).css("left",+setLeft);
		
	$(blockName).click(function(){
			$(this).hide('explode',{pieces:16},250,function(){levelUp(blockName);});
	}); 
	
	checkStatus(blockName);
	
}	

var checkStatus = function(blockName) {

	// this function and dropIt make up the game loop.
	
	var gameHeight = gameHeight();
	var gameWidth = gameWidth();
	var position = getPosition(blockName);
	var blockHeight = $(blockName).height();
	
	if(position >= (gameHeight - blockHeight)) {
	
		$('.block').stop().fadeOut('slow');
		level = 1;
		idNumber = 1;
		alert('GAME OVER');
		
	}else{
		dropIt(blockName);
	}
}

var dropIt = function(blockName) {

	// this function and checkStatus make up the game loop
	
	var speed = 2;
	
	$(blockName).animate({top:'+='+speed},10,function(){checkStatus(blockName);});
			
		
};

var getPosition = function(blockName) {

	var position = $(blockName).position().top;
	return position;
}

var levelUp =function(blockName) {
	$(blockName).remove();
	
	if ( $('#game_area').children().length <= 1 ) {  // checks to see if there are any blocks in the game_area.
			level++;
			$('#footer').html('<h2>Player: '+player+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level:' +level+'</h2>');  // updates the footer with the new level
			blockLauncher();
	}
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
	
		}
	
	
	});

$('#start_button').click(function(){
	
		
		$('#start_button').effect('explode',750,function(){$('#start_button').remove();});

		alert('Click the blocks before they hit the bottom!');
	
		blockLauncher();

		
		
		}); // ends start button click



					
					
}); // ends document ready
	
	