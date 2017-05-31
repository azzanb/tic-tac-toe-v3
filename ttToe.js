//--------LOAD STARTUP SCREEN--------//

var div = $("<div></div>")[0];
var header = $('<header></header>')[0];
var h1 = $('<h1></h1>')[0];
var a = $('<a></a>')[0];
var ul = $('<ul></ul>')[0];
var li = $('<li></li>')[0];

$(div).addClass("screen screen-start");
div.id = "start";
div.prepend(header);
$(h1).text("Tic Tac Toe");
header.prepend(h1);
$(a).text("Start game");
a.href = "#";
$(a).addClass("button");
header.append(a);

$('body').ready(() => {
	$('#board').hide();
	$('body').prepend(div);
		$('.button').click( () => {
		$(div).hide();
		$('#board').show();
	});
});


//Construtor Function
function Game(){
	
}

Game.prototype.hover = () => { 
	$('.box').hover( function(){ 
		if($('#player1').hasClass("active")){
			$(this).css({backgroundImage: "url('img/o.svg')"});
		}
		else if($('#player2').hasClass("active")){
			$(this).css({backgroundImage: "url('img/x.svg')"})
		}
	},
		function(){
			$(this).css({backgroundImage: ""});
	});
}

Game.prototype.click = () => {
	$('#player1').addClass("active");
	$('.box').one("click", function() { 
		$('.players').toggleClass("active");
		$(this).hover().off();

		if($('#player1').hasClass("active")){
			$(this).addClass("box-filled-2"); //it works, but it's is backwards
		}
		else if($('#player2').hasClass("active")){
			$(this).addClass("box-filled-1"); //it works, but it's is backwards
		}
	});
}

Game.prototype.moves = () => {
	var movesO = [];
	var movesX = [];
	$('.box').one("click", function() {
		var index = $(this).index();

		if($(this).hasClass("box-filled-1")){
			movesO.push(index);
		}
		if($(this).hasClass("box-filled-2")){
			movesX.push(index);
		}
	});
}

Game.prototype.win = () => {
	var wins = [
		[0,1,2], 
		[3,4,5], 
		[6,7,8], //horizontal
		[0,3,6], 
		[1,4,7], 
		[2,5,8], //vertical
		[0,4,8], 
		[2,4,6] //diagonal
		
	];

	$('.box').one("click", function() {
		for(var i = 0; i < $('.box').length; i++){
			var winsInd = wins[i];
			var findInd = $(wins[i]).index($(this).index()); //returns 0, 1, or 2
			
			if( findInd !== -1 && $(this).hasClass("box-filled-1") ){
			 	winsInd.splice(findInd, 1);
				if(winsInd.length === 0){
					return console.log("O wins!!");
						//Add the necessary div for the winning page
				}
			}
		}
	});
}


var player1 = new Game();
player1.click();
player1.hover();
player1.moves();
player1.win();









