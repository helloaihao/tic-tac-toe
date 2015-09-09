var people_right = '√';
var people_wrong = '×';
var chess_step   = 0;
var chess_size   = 3;
var cell_dom    = [];
var cell_val     = [];

var initGame = function() {
	console.log('初始化游戏');
	for(var i = 0; i < chess_size; i ++) {
		cell_dom[i] = [];
		cell_val[i]  = [];
	}
	for(var i = 0; i < chess_size; i ++) {
		for(var j = 0; j < chess_size; j ++) {
			cell_dom[i][j] = document.getElementsByClassName('cell')[i*chess_size+j];
		}
	}
}

var newGame = function() {
	console.log('新的游戏');
	chess_step = 0;
	for(var i = 0; i < chess_size; i ++) {
		for(var j = 0; j < chess_size; j ++) {
			cell_dom[i][j].text = '';
			cell_val[i][j]  = 0;
		}
	}
}

var winGame = function(x, y) {
	console.log(x+' '+y);
	var row_val = 0;		// X方向
	var col_val = 0;		// Y方向
	var right_slash = 0;	// '\'方向
	var left_slash = 0;		// '/'方向

	for(var i = 0; i < chess_size; i ++) {
		row_val += cell_val[x][i];
		col_val += cell_val[i][y];
	}

	for(var i = 0; i < chess_size; i ++) {
		for(var j = 0; j < chess_size; j ++) {
			if( i === j ) {
				right_slash += cell_val[i][j];
			}
			if( i === chess_size - j - 1 ) {
				left_slash += cell_val[i][j];
			}
		}
	}

	if( Math.abs(row_val) == chess_size || Math.abs(col_val) == chess_size || 
		Math.abs(right_slash) == chess_size || Math.abs(left_slash) == chess_size) {
		return 1;
	}

	if( chess_step === chess_size*chess_size ) {
		return -1;
	}
}

var Game = function() {
	initGame();
	newGame();
	for(var i = 0; i < chess_size; i ++) {
		for(var j = 0; j < chess_size; j ++) {

			(function(i, j){
				cell_dom[i][j].onclick = function() {
					if( this.text !== '' ) {
						return ;
					}

					chess_step ++;

					if( chess_step % 2 === 0 ) {
						this.text = people_wrong;
						cell_val[i][j] = -1;
					} else {
						this.text = people_right;
						cell_val[i][j] = 1;
					}

					var tmp = winGame(i, j);
					if( tmp === 1 ) {
						console.log('游戏结束');
						if( chess_step % 2 === 0 ) {
							alert('使用×的玩家获胜！');
						} else {
							alert('使用√的玩家获胜！');
						}
						newGame();
					}
					if( tmp === -1 ) {
						console.log('游戏结束');
						alert('平局！');
						newGame();
					}
				}
			})(i, j);
			
		}
	}
}

var addLoadEvent = function(f) {
	var oldOnload = window.onload;
	if( typeof window.onload != 'funciton' ) {
		window.onload = f;
	} else {
		window.onload = function() {
			oldOnload();
			f();
		}
	}
}

addLoadEvent(Game);