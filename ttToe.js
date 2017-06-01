//--------LOAD STARTUP SCREEN--------//

var div = $("<div></div>")[0];
var header = $('<header></header>')[0];
var h1 = $('<h1></h1>')[0];
var a = $('<a></a>')[0];
var ul = $('<ul></ul>')[0];
var li = $('<li></li>')[0];
var p = $('<p></p>')[0];

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
function Game(name){
	this.name = name;
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

Game.prototype.moves = (n,pl) => {
	var moves_pl = [];
	$('.box').one("click", function() {
		var index = $(this).index();
		if($(this).hasClass("box-filled-" + n)){
			moves_pl.push(index);
		}
	});
}

Game.prototype.win = (n,pl,winNum) => {
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
		for(var i = 0; i < wins.length; i++){
			var winsInd = wins[i];
			var findInd = $.inArray($(this).index(), winsInd);
			if( findInd > -1 && $(this).hasClass("box-filled-" + n) ){
			 	winsInd.splice(findInd, 1);
				if(winsInd.length === 0){
					$(div).removeClass("screen-start");
					$(div).addClass("screen-win screen-win-" + winNum);
					div.id="finish";
					header.append(p);
					p.class = "message";
					$(p).insertBefore($(a));
					a.text = "New game";
					$('.board').hide();
					return $('#finish').show()
				}
			}
		}
	});
}


var player1 = new Game();
var person = new Game("Azzan");
console.log(person.name);
player1.click();
player1.hover();
player1.moves(1, "O");
player1.moves(2, "X");
player1.win(1, "O", "one");
player1.win(2, "X", "two");









