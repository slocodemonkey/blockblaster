$(document).ready(function() {


var AreaMaker = function (){

	this.getWidth = function() {
		var width = $('#game_area').width();
		return width;
	};
	this.getHeight = function() {
		var height = $('#game_area').height();
		return height;
	};

	this.gameWidth = this.getWidth();
	this.gameHeight = this.getHeight();
	
};

var GameMaker = function(gameArea) {

	this.level = 1;
	this.gameOver = false;
	
	this.getRandom = function(min,max) {
		var number = Math.floor(Math.random() * (max - min + 1)) + min;
		return number;
	};
	
	this.getColor = function() {
		var color = this.getRandom(1,4);
		switch(color) {
			case 1:
				color = "red";
				break;
			case 2:
				color = "green";	
				break;
			case 3:
				color = "gold";
				break;
			case 4:
				color = "blue";
				break;
		}
		return color;
	};
	
	this.setLeft = function(blockName) {
		var name = '#'+blockName;
		var gameWidth = gameArea.gameWidth;
		var blockWidth = $(name).width();
		var width = gameWidth - blockWidth;
		var leftPosition = this.getRandom(1,width);
		return leftPosition;
	};
	
	this.reset = function(){
		this.level=1;
		var myClass = this;
		setTimeout(function(){
		$('.block').remove();
		},500)
		$('#game_area').append('<button id="reset" class="big_button">PLAY AGAIN</button>');
            // add event binding for new button
            $(document).on("click", '#reset', function () {
			$('#reset').effect('explode',750,function(){$('#reset').remove();});
			$('#footer').html('<h2>Level: 1</h2>'); 
			
			$('.block').remove();
			myClass.blockLauncher(myClass.level);
		});
	};
	
	this.blockName =function(number){
		name = 'block'+number;
		return name;
	};
	
	this.levelUp = function(blockName){
		$('#'+blockName).remove();
	
		if($('#game_area').children().length === 0 ) {
			this.level++;
			var level = this.level;
			$('#footer').html('<h2>Level:' +level+'</h2>');  // updates the footer with the new level
			this.blockLauncher(level);
		}
	};

	this.blockBuilder = function(name){
		var blockName = name;
		$('#game_area').prepend('<div class = "block" id=' + blockName + '></div>');
		$('body').disableSelection();
		var color = this.getColor();
		$('#'+blockName).css("background-color",color);
		
		var leftPosition = this.setLeft(blockName);
		$('#'+blockName).css("left",+leftPosition);
		
		var myClass = this;
			
		$('#'+blockName).click(function(){
			$(this).hide('explode',{pieces:16},250,function(){myClass.levelUp(blockName);});
		});
		
		this.checkStatus(blockName);
	};
	
	
			
	this.getPosition = function(blockName){
		var name = '#'+blockName;
		var position = $(name).position().top;
		return position;
	};
	
	this.checkStatus = function(blockName){
		var name = '#'+blockName;
		var gameHeight = gameArea.gameHeight;
		var position = this.getPosition(blockName);
		var blockHeight = $(name).height();
		if(position >= (gameHeight - blockHeight)) {
			$('.block').stop().fadeOut('slow');
			this.gameOver = true;
			alert('Game Over');
			this.reset();
		}else{
			this.dropIt(blockName);
		}
	};
		
	this.dropIt = function(blockName){
		var name='#'+blockName;
		var speed = 2;
		var myClass = this;
		//var check = this.checkStatus(blockName);
		$(name).animate({top:'+='+speed},10,function(){myClass.checkStatus(blockName);});
	};
	
	this.blockLauncher = function(level) {
		this.gameOver=false;
		var i = 0;
		var myClass = this;

		var launch = function () {
			
			setTimeout(function(){ // loop repeats every half second
			var blockName = myClass.blockName(i);
			$('#'+blockName).remove();
			myClass.blockBuilder(blockName); // calls the function that creates the block
			i++;
			if(i<level && myClass.gameOver==false) {
			launch();
			}
		},500)
			if(this.gameOver==true){
			$('.block').remove();
			}
		}; // ends launch function
		
		launch();
	

	}; // ends blockLauncher object
}; // ends gameMaker constructor


$('#start_button').click(function(){
	
	var gameArea = new AreaMaker();
	var blockBlaster = new GameMaker(gameArea);

		
		$('#start_button').effect('explode',750,function(){$('#start_button').remove();});
		$('#footer').html('<h2>Level: 1</h2>');
		
		
	blockBlaster.blockLauncher(blockBlaster.level);
	
}); // ends start button click
			
				
}); // ends document ready
