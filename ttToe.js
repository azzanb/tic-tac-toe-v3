"use strict";

var div = $("<div></div>")[0];
var header = $('<header></header>')[0];
var h1 = $('<h1></h1>')[0];
var a = $('<a></a>')[0];
var p = $('<p></p>')[0];

//This sets up the starting home page
function startPage(){
	$(div).addClass("screen screen-start");
	div.prepend(header);
	$(h1).text("Tic Tac Toe");
	header.prepend(h1);
	$(a).text("Start game");
	a.href = "#";
	$(a).addClass("button");
	header.append(a);
	$('#board').hide();
	$('body').prepend(div);
}


var wins = [
			[0,1,2], 
			[3,4,5], 
			[6,7,8], 
			[0,3,6], 
			[1,4,7], 
			[2,5,8], 
			[0,4,8], 
			[2,4,6] 
];
var clone = wins.map(function(arr){
	return arr.slice();
});
//Everytime the button is clicked a new game begins
function startGame(){ 
	$('.button').click(function(){
		$('#player1').addClass('active');
		$('#player2').removeClass('active');
		$('.screen').removeClass('screen-win screen-win-one screen-win-two screen-win-tie');
		$('.box').removeClass("box-filled-1 box-filled-2");
		$('.box').removeAttr('style');
		$('.screen').hide();
		$('#board').show();
		console.log(clone);
		clone;
	});
}

//This displays the winning page
function winner(){
	$(div).removeClass("screen-start");
	div.id="finish";
	header.append(p);
	$(p).addClass("message");
	$(p).insertAfter(h1);
	a.text = "New game";
	$('.board').hide();
	$('#finish').show();
}

// function gameTie(){
// 	$(div).removeClass("screen-start");
// 	//$(div).addClass("screen-win screen-win-" + winNum);
// 	div.id="finish";
// 	header.append(p);
// 	$(p).addClass("message");
// 	$(p).insertAfter(h1);
// 	//$(p).text("Winner");
// 	a.text = "New game";
// 	$('.board').hide();
// 	$('#finish').show();
// }


function clicking(){
	
	if($('#player1').hasClass("active") && !$(this).hasClass("box-filled-1") && !$(this).hasClass("box-filled-2")){
		$(this).addClass("box-filled-1"); //it works, but it's is backwards	
		$('.players').toggleClass("active");
	}
	if($('#player2').hasClass("active") && !$(this).hasClass("box-filled-1") && !$(this).hasClass("box-filled-2")){
		$(this).addClass("box-filled-2"); //it works, but it's is backwards
		$('.players').toggleClass("active");
	}
}
$('.box').click(clicking);





//CONSTRUCTOR FUNCTION
function Game(/*player1Num, box1Num, playr2Num, box2Num*/){
	this.startPage = startPage();
	this.startGame = startGame();

	// this.click = function(){
	// 	$('#player1').addClass("active");
	// 	$('.box').on('click', function() { 
	// 		$('.players').toggleClass("active");
	// 		if($('#player1').hasClass("active")){
	// 			$(this).addClass("box-filled-2"); //it works, but it's is backwards	
	// 		}
	// 		if($('#player2').hasClass("active")){
	// 			$(this).addClass("box-filled-1"); //it works, but it's is backwards
	// 		}
	// 		$(this).off('click');
	// 	});
	// },


	this.hover = function(player1Num, player2Num){
		$('.box').hover(function(){ 
			if($('#player1').hasClass("active") && !$(this).hasClass('box-filled-2')){
				$(this).css({backgroundImage: "url('img/o.svg')"});
			}
			else if($('#player2').hasClass("active") && !$(this).hasClass('box-filled-1') ){
				$(this).css({backgroundImage: "url('img/x.svg')"})
			}
		},
			function(){
				$(this).css({backgroundImage: ""});
		});
	},

	//Loops through array of possible win solutions to determine a winner
	this.win = function(playerNum, winNum){
		// clone = wins.map(function(arr){
		// 		return arr.slice();
		// });

		$('.box').click(function() {
			for(var i = 0; i < clone.length; i++){
				var cloneIndex = clone[i];
				var findIndex = $.inArray($(this).index(), cloneIndex);

				if( findIndex > -1 && $('#player1.active')){
				 	cloneIndex.splice(findIndex, 1);		
				}			
				if(cloneIndex.length === 0){ 
					console.log(clone);
					clone = wins.map(function(arr){
						return arr.slice();
					});
					$(div).addClass("screen-win screen-win-" + winNum);
					$(p).text("Winner");
					winner(); 
				}
			}
		});
		return false;
	}
}

var player1 = new Game();
var player2 = new Game();
player1.hover("1", "2");
player1.win("1","one");
//player2.win("2", "two");





