module game {
  let animationEnded = false;
  let canMakeMove = false;
  let isComputerTurn = false;
  let lastUpdateUI: IUpdateUI = null;
  let state: IState = null;
  export let isHelpModalShown: boolean = false;
  let selectedPosition: IPosition = null;
  let possibleMoves: IMove[] = [];
  let playerNo = 0;
  interface IPosition {
    row: number;
    col: number;
  }

  export function init() {
    console.log("Translation of 'RULES_OF_DIAMOND_GAME' is " + translate('RULES_OF_DIAMOND_GAME'));
    resizeGameAreaService.setWidthToHeight(1);
    gameService.setGame({
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 3,
      isMoveOk: gameLogic.isMoveOk,
      updateUI: updateUI
    });

    // See http://www.sitepoint.com/css3-animation-javascript-event-handlers/
    document.addEventListener("animationend", animationEndedCallback, false); // standard
    document.addEventListener("webkitAnimationEnd", animationEndedCallback, false); // WebKit
    document.addEventListener("oanimationend", animationEndedCallback, false); // Opera

    gameLogic.initialPLayersMap();
  }

  function animationEndedCallback() {
    $rootScope.$apply(function () {
      log.info("Animation ended");
      animationEnded = true;
      if (isComputerTurn) {
        sendComputerMove();
      }
    });
  }

  function sendComputerMove() {
    gameService.makeMove(aiService.findComputerMove(lastUpdateUI));
  }

  function updateUI(params: IUpdateUI): void {
    animationEnded = false;
    lastUpdateUI = params;
    console.log("updateUI[1-1] params=", JSON.stringify(params));
    playerNo = params.playersInfo.length;
    state = params.stateAfterMove;
    if (!state.board) {
      state.board = gameLogic.getInitialBoard(playerNo);
    }

    rotateGameBoard(params);

    canMakeMove = params.turnIndexAfterMove >= 0 && // game is ongoing
      params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn

    // Is it the computer's turn?
    isComputerTurn = canMakeMove &&
        params.playersInfo[params.yourPlayerIndex].playerId === '';

    if (isComputerTurn) {
      // To make sure the player won't click something and send a move instead of the computer sending a move.
      canMakeMove = false;
      // We calculate the AI move only after the animation finishes,
      // because if we call aiService now
      // then the animation will be paused until the javascript finishes.
      if (!state.delta) {
        // This is the first move in the match, so
        // there is not going to be an animation, so
        // call sendComputerMove() now (can happen in ?onlyAIs mode)
        sendComputerMove();
      }
    }
  }

  export function cellClicked(row: number, col: number): void {
    //log.info(["Clicked on cell:", row, col]);
    if (window.location.search === '?throwException') { // to test encoding a stack trace with sourcemap
      throw new Error("Throwing the error because URL has '?throwException'");
    }
    if (!canMakeMove) {
      return;
    }

    var myPlayerId: number = lastUpdateUI.turnIndexAfterMove;
    var delta: BoardDelta = {rowS:row, colS:col, rowE:row, colE:col, playerNo:playerNo};

    try {
      // select phase:
      //   if the player does not click on their own pieces
      //   or the piece has no valid move, then return
      //console.log("cellClicked[1-1]", selectedPosition);
      if (selectedPosition == null){
        //console.log("cellClicked[1-3] isSelectable", isSelectable(row, col, myPlayerId, delta));
        if (isSelectable(row, col, myPlayerId, delta)) {
          selectedPosition = {row:row, col:col};
          // do something to show the selected piecs
          changePieceColor(row, col, myPlayerId, true);
        }
      } else {
        // put phase:
        // if this position is the same with last position,
        // then put the piece back
        if (selectedPosition.row === row && selectedPosition.col === col){
          selectedPosition = null;
          //changePieceColor(row, col, myPlayerId, false);
          return;
        }

        var thisDelta: BoardDelta = {rowS: selectedPosition.row, colS: selectedPosition.col, rowE:row, colE:col, playerNo:playerNo};
        var move = gameLogic.createMove(state.board, myPlayerId, thisDelta);

        //console.log("cellClicked[2-41] move", JSON.stringify(move));
        //console.log("cellClicked[2-2] possibleMoves", JSON.stringify(possibleMoves));

        if (isContain(possibleMoves, move)){
          canMakeMove = false; // to prevent making another move
          gameService.makeMove(move);
          selectedPosition = null;
          //changePieceColor(row, col, myPlayerId, false);
        }
      }

    } catch (e) {
      log.info(["Not a valid move"]);
      return;
    }
  }

  export function shouldShowImage(row: number, col: number): boolean {
    let cell = state.board[row][col];
    return cell !== "";
  }

  export function isPieceRed(row: number, col: number): boolean {
    return state.board[row][col] === 'R' && !isSelected(row, col);
  }

  export function isPieceGreen(row: number, col: number): boolean {
    return state.board[row][col] === 'G' && !isSelected(row, col);
  }

  export function isPieceYellow(row: number, col: number): boolean {
    return state.board[row][col] === 'Y' && !isSelected(row, col);
  }

  export function shouldSlowlyAppear(row: number, col: number): boolean {
    return !animationEnded &&
        state.delta &&
        state.delta.rowE === row && state.delta.colE === col;
  }

  export function getBoardRow(){
    return new Array(13);
  }

  export function getBoardCol(){
    return new Array(19);
  }

  function isSelectable(row:number, col:number, playerId: number, delta: BoardDelta): boolean {
    //console.log("isSelectable[0]", state.board[row][col]);
    //console.log("isSelectable[1]", gameLogic.getPlayerColorById(playerId));
    if (state.board[row][col] !== gameLogic.getPlayerColorById(playerId)){
      return false;
    }

    possibleMoves = gameLogic.getPossibleMoves(state.board, playerId, delta)
    if (possibleMoves.length == 0){
      return false;
    }
    return true;
  }

  function isContain(array:any[], target:any){
    for (var i=0; i<array.length; i++){
      if (angular.equals(array[i], target)){
        return true;
      }
    }
    return false;
  }

  function rotateGameBoard(params: IUpdateUI){
    if (params.playMode == "single-player"){
      return;
    }

    var gameBoard = document.getElementById("gameArea");
    var thisPlayerColor = gameLogic.getPlayerColorById(params.turnIndexAfterMove);
    switch (thisPlayerColor){
      case "R" : gameBoard.className = "rotationR"; break;
      case "G" : gameBoard.className = "rotationG"; break;
      case "Y" : gameBoard.className = "rotationY"; break;
    }
  }

  function changePieceColor(row: number, col: number, playerId: number, startMove: boolean){
    var playerPiece = document.getElementById("piece" + gameLogic.getPlayerColorById + "_" + row + "_" + col);
    var replacedPiece = document.getElementById("pieceN_" + row + "_" + col);

    console.log();
    if (startMove){
      playerPiece.style.display = "none";
      replacedPiece.style.display = "block";
    } else {
      playerPiece.style.display = "block";
      replacedPiece.style.display = "none";
    }
  }

  export function isSelected(row: number, col: number): boolean {
    if (!selectedPosition){ return false; }
    if (selectedPosition.row === row && selectedPosition.col === col){
      return true;
    }
    return false;
  }

}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function () {
  $rootScope['game'] = game;
  translate.setLanguage('en',  {
    RULES_OF_DIAMOND_GAME:"Rules of Diamond Game",
    RULES_SLIDE1:"You and your opponent take turns to move your own piece. The first player's piece is red, second is green, third is yellow, etc.",
    RULES_SLIDE2:"You can move your piece to an adjancent empty position",
    RULES_SLIDE3:"Or jump over any other pieces for any consecutive jump steps",
    RULES_SLIDE4:"The first to put all pieces into the other end of board wins.",
    CLOSE:"Close"
  });
  game.init();
});
