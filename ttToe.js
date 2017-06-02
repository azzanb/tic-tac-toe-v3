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

//X and O becomes the background image when the mouse hovers over the squares
function hover(){
	$('.box').hover(function(){ 
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

//When player(s) click(s), box becomes O or X
function clicking(){
	$('#player1').addClass("active");
		$('.box').on("click", function() { 
			
			$('.players').toggleClass("active"); //this toggles active and inactive players
			$(this).hover().off();

			if($('#player1').hasClass("active")){
				$(this).addClass("box-filled-1"); //it's is backwards but works
			}
			else if($('#player2').hasClass("active")){
				$(this).addClass("box-filled-"); //it's is backwards but works
			}
		});
}

//Everytime the button is clicked a new game begins
function startGame(){ 
	$('.button').click(function(){
		//$('#player1').addClass('active');
		$('#player2').removeClass('active');
		$('.screen').removeClass('screen-win screen-win-one screen-win-two screen-win-tie');
		$('.box').removeClass("box-filled-1 box-filled-2");
		$('.box').removeAttr("style");
		$('.screen').hide();
		$('#board').show();
		
		//PROBLEM?: Hover and click function are invoked here, but already methods in the Game constructor function
		hover();
		clicking(); 
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


//CONSTRUCTOR FUNCTION
function Game(/*player1Num, box1Num, playr2Num, box2Num*/){
	this.startPage = startPage();
	this.startGame = startGame();
	

	this.moves = function(n){
		var moves = [];
		$('.box').on("click", function() {
			var index = $(this).index();
			if($(this).hasClass("box-filled-" + n)){
				moves.push(index);
			}
		});
	},

	//Click property, BUT method already called in startGame()
	this.click = function(player1Num, box2Num, player2Num, box1Num){
		$('#player' + player1Num).addClass("active");
		$('.box').on("click", function() { 
			 $('.players').toggleClass("active");
			 $(this).hover().off();

			if($('#player' + player1Num).hasClass("active")){
				$(this).addClass("box-filled-" + box2Num); //it works, but it's is backwards	
			}
			else if($('#player' + player2Num).hasClass("active")){
				$(this).addClass("box-filled-" + box1Num); //it works, but it's is backwards
			}
		});
	},

	//Hover object, BUT method already called in startGame(). 
	// this.hover = function(player1Num, player2Num){
	// 	$('.box').on("hover",function(){ 
	// 		if($('#player' + player1Num).hasClass("active")){
	// 			$(this).css({backgroundImage: "url('img/o.svg')"});
	// 		}
	// 		else if($('#player' + player2Num).hasClass("active")){
	// 			$(this).css({backgroundImage: "url('img/x.svg')"})
	// 		}
	// 	},
	// 		function(){
	// 			$(this).css({backgroundImage: ""});
	// 	});
	// },


	//Loops through array of possible win solutions to determine a winner
	this.win = function(playerNum, winNum){
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
		
		$('.box').one("click", function() {
			for(var i = 0; i < wins.length; i++){
				var clone = wins.slice(0); //want to clone here
				var winsIndex = wins[i];
				var findIndex = $.inArray($(this).index(), winsIndex);
				
				if( findIndex > -1 && $(this).hasClass("box-filled-" + playerNum) ){
				 	winsIndex.splice(findIndex, 1);
					if(winsIndex.length === 0){ //if one sub array in wins has no more values
						$(div).addClass("screen-win screen-win-" + winNum);
						$(p).text("Winner");
						winner();
						wins = clone; //set wins back to its original here 
					}
				}
			}
		});
	}
}


//This is a hodgepodge of craziness I'll get to

var player1 = new Game();
var player2 = new Game();
player1.click("1", "2", "2", "1");
//player2.click("2", "1", "1", "2");
//player1.hover("1", "2");
player1.moves(1);
//player1.moves(2);
player1.win("1","one");
player2.win("2", "two");


/*
ISSUES
Line 49-50: For the hover and click methods in the new game to work properly, I have to invoke it inside 
	the startGame function. The methods are already in the Game constructor. So they are being called twice, but ti still works........???????
	It's working but it's cluttering, so I've been tinkering with better ways without destroying functionality.
	It hasn't been working. 

Line 145, 163: I splice values from the wins sub-arrays that matches the value of the clicked box.
	What's happening is when starting a new game, when clicking all previously clicked boxes, they will be the same 
	color/letter. So I believe the problem is with the wins array, how I' determining a winner
*/









