"use strict";

/* This is the global variable everything will be stored in,
  and the self-executing function */
var ttToe = (function(){
	var div = $("<div></div>")[0];
	var header = $('<header></header>')[0];
	var h1 = $('<h1></h1>')[0];
	var a = $('<a></a>')[0];
	var p = $('<p></p>')[0];
	var clickTimes = 0;
	
//The array that lists possible ways to win
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

//The cloned arrays of wins array (each for both players)
	let clone = wins.map(function(arr1){
		return arr1.slice();
	});
	let player2clone = wins.map(function(arr2){
		return arr2.slice();
	});

	
//Set up the opening page
	const startPage = function(){
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
		clickTimes = 0;
	}

	
/* Everytime the button is clicked a new game begins, 
board shows, opening/winning/tie screen disappears */
	const startGame = function(){ 
		$('.button').click(function(){
			$('#player1').addClass('active');
			$('#player2').removeClass('active');
			$('.screen').removeClass('screen-win screen-win-one screen-win-two screen-win-tie');
			$('.box').removeClass("box-filled-1 box-filled-2");
			$('.box').removeAttr('style');
			$('.screen').hide();
			$('#board').show();
			clone;
			player2clone;
			clickTimes = 0;
		});
	}

//Display the winning page, and reset cloned arrays
	const winner = function(){
		$(div).removeClass("screen-start");
		div.id="finish";
		header.append(p);
		$(p).addClass("message");
		$(p).insertAfter(h1);
		a.text = "New game";
		$('.board').hide();
		$('#finish').show();
		clickTimes = 0;
		clone = wins.map(function(arr1){
			return arr1.slice();
		});

		player2clone = wins.map(function(arr2){
			return arr2.slice();
		});
	}

//Set page if game is a tie
	const gameTie = function(){
		$(div).addClass("screen-win screen-win-tie");
		$(p).text("Draw");
		winner();
	}

//Game constructor function, which holds all functions 
	function Game(){
		this.startPage = startPage();
		this.startGame = startGame();

//Set function for clicking boxes and setting player images
		this.click = function(){
		function clicking(){
			if($('#player1').hasClass("active") && !$(this).hasClass("box-filled-1") && !$(this).hasClass("box-filled-2")){
				$(this).addClass("box-filled-1");	
				$('.players').toggleClass("active");
			}
			else if($('#player2').hasClass("active") && !$(this).hasClass("box-filled-1") && !$(this).hasClass("box-filled-2")){
				$(this).addClass("box-filled-2"); 
				$('.players').toggleClass("active");
			}
		}
		$('.box').click(clicking);
		},

//Set function for hovering over the boxes
		this.hover = function(){
			$('.box').hover(function(){ 
				if($('#player1').hasClass("active") && !$(this).hasClass('box-filled-2')){
					$(this).css({backgroundImage: "url('img/o.svg')"});
				}
				else{
					$(this).css({backgroundImage: "url('img/x.svg')"})
				}
			},
				function(){
					$(this).css({backgroundImage: ""});
			});
		},

//Loop through cloned arrays with every click to determine a winner
		this.win = function(){
			$('.box').click(function() {		
				
				if(clickTimes == 8){
					gameTie();
				}

				//if for player O
				if(clickTimes % 2 == 0){
					for(var i = 0; i < clone.length; i++){
						var cloneIndex = clone[i];
						var findIndex = $.inArray($(this).index(), cloneIndex);

					//if the box is empty, click and splice index number from cloned wins array
						if( findIndex > -1 && $('#player1.active')){
							cloneIndex.splice(findIndex, 1);	
							//clickTimes++;	
						}
					//when one sub-array of cloned array is empty, player wins				
						if(cloneIndex.length === 0){ 
							clone = wins.map(function(arr1){
								return arr1.slice();
							});
							$(div).addClass("screen-win screen-win-one");
							$(p).text("Winner");
							winner(); 
						}
					}
				}
				

				//else for player X
				else{
					for(var i = 0; i < player2clone.length; i++){
						var cloneIndex2 = player2clone[i];
						var findIndex2 = $.inArray($(this).index(), cloneIndex2);

					//if the box is empty, click and splice index number from cloned wins array
						if( findIndex2 > -1 && $('#player2.active')){
							cloneIndex2.splice(findIndex2, 1);
							//clickTimes++;		
						}
					//when one sub-array of cloned array is empty, player wins		
						if(cloneIndex2.length === 0){ 
							player2clone = wins.map(function(arr2){
								return arr2.slice();
							});
							$(div).addClass("screen-win screen-win-two");
							$(p).text("Winner");
							winner(); 
						}
					}
				}
				clickTimes++;
				console.log(clickTimes);
			});
			return false; 
		}
	}

//Instantiate game to a variable
	var gameplay = new Game();
	gameplay.click();
	gameplay.hover("1", "2");
	gameplay.win();

}());
//End self-executing function and game is ready
