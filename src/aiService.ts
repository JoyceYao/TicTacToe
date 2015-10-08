module aiService {
  interface IStateHistory {
    board: Board;
    delta: BoardDelta[];
  }
  /**
   * Returns the move that the computer player should do for the given board.
   * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
   * and it has either a millisecondsLimit or maxDepth field:
   * millisecondsLimit is a time limit, and maxDepth is a depth limit.
   */
  export function createComputerMove(
      board: Board, steps: number, playerNo: number, playerIndex: number): IMove {
    // We use alpha-beta search, where the search states are TicTacToe moves.
    // Recal that a TicTacToe move has 3 operations:
    // 0) endMatch or setTurn
    // 1) {set: {key: 'board', value: ...}}
    // 2) {set: {key: 'delta', value: ...}}]
    return getBestMove(board, steps, playerNo, playerIndex);
  }
/*
  function getStateScoreForIndex0(move: IMove, playerIndex: number): number {
    if (move[0].endMatch) {
      var endMatchScores = move[0].endMatch.endMatchScores;
      return endMatchScores[0] > endMatchScores[1] ? Number.POSITIVE_INFINITY
          : endMatchScores[0] < endMatchScores[1] ? Number.NEGATIVE_INFINITY
          : 0;
    }
    return 0;
  }

  function getNextStates(move: IMove, playerIndex: number): IMove[] {
    return gameLogic.getPossibleMoves(move[1].set.value, playerIndex);
  }

  function getDebugStateToString(move: IMove): string {
    return "\n" + move[1].set.value.join("\n") + "\n";
  }*/

  function getBestMove(board: Board, steps: number, playerNo: number, playerIndex: number) : IMove {
    gameLogic.initialPLayersMap();
    var minDist = 120; // MaxDist 12 * PieceNo 10
    var bestDelta : BoardDelta;
    var stateList = getBoardListAfterNSteps(board, {rowS:0, colS:0, rowE:0, colE:0, playerNo: playerNo}, playerIndex, steps, true);
    var targetRow = getTargetPosi(board, playerIndex);

    for (var i=0; i<stateList.length; i++){
      var thisDist = 0;
      var thisBoard = stateList[i].board;
      var thisDelta = stateList[i].delta;
      var myPieces = getMyPiecePosition(thisBoard, playerIndex);
    //  console.log("getBestMove myPieces=" + JSON.stringify(myPieces));
      for (var j=0; j<myPieces.length; j++){
        var dist = getDistToTarget(thisBoard, targetRow, myPieces[j][0], myPieces[j][1], playerIndex);
        thisDist += dist;
      }
      //console.log("getBestMove thisDist=" + thisDist + " minDist="+minDist);
      if (thisDist < minDist){
        minDist = thisDist;
        bestDelta = thisDelta;
      }
    }
    var myMove = gameLogic.createMove(board, playerIndex, bestDelta);
    console.log("getBestMove=" + JSON.stringify(myMove));
    return myMove;
  }

  function getBoardListAfterNSteps(board: Board, delta: BoardDelta, playerIndex: number, steps: number, firstRun: boolean): IState[] {
    if (steps == 0){ return [{board: board, delta: delta}]; }
    var result : IState[] = [];
    var myPieces = getMyPiecePosition(board, playerIndex);
    for (var i=0; i<myPieces.length; i++){
      var row = myPieces[i][0];
      var col = myPieces[i][1];
      //console.log("myPieces= " + row + " " + col);
      var allMoves = gameLogic.getPossibleMoves(board, playerIndex, {rowS:row, colS:col, rowE:row, colE:col, playerNo:delta.playerNo});

      for (var j=0; j<allMoves.length; j++){
        var thisMove = allMoves[j];
        //console.log("thisMove " + j + "= " + JSON.stringify(thisMove));
        //console.log("thisMove[1]=" + JSON.stringify(thisMove[1]));
        //console.log("thisMove[2]=" + JSON.stringify(thisMove[2]));
        var nextBoard = thisMove[1].set.value;
        var nextDelta = firstRun? thisMove[2].set.value : delta;
        var thisResult = getBoardListAfterNSteps(nextBoard, nextDelta, playerIndex, steps-1, false);
        if(thisResult){ result.push.apply(result, thisResult); }
      }
    }
    return result;
  }

  function getMyPiecePosition(board: Board, playerIndex: number): number[][] {
    var myColor = playersMap[playerIndex];
    var result : number[][] = [];
    for (var i=0; i<board.length; i++){
      for (var j=0; j<board[0].length; j++){
        if (board[i][j] == myColor){
          result.push([i, j]);
        }
      }
    }
    return result;
  }

  var rowNoByPlayer: string[][][] =
   [[['#', '#', '#', '#', '#', '#', '#', '#', '#', '0', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '1', '', '1', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '2', '', '2', '', '2', '#', '#', '#', '#', '#', '#', '#'],
     ['3', '', '3', '', '3', '', '3', '', '3', '', '3', '', '3', '', '3', '', '3', '', '3'],
     ['#', '4', '', '4', '', '4', '', '4', '', '4', '', '4', '', '4', '', '4', '', '4', '#'],
     ['#', '#', '5', '', '5', '', '5', '', '5', '', '5', '', '5', '', '5', '', '5', '#', '#'],
     ['#', '#', '#', '6', '', '6', '', '6', '', '6', '', '6', '', '6', '', '6', '#', '#', '#'],
     ['#', '#', '7', '', '7', '', '7', '', '7', '', '7', '', '7', '', '7', '', '7', '#', '#'],
     ['#', '8', '', '8', '', '8', '', '8', '', '8', '', '8', '', '8', '', '8', '', '8', '#'],
     ['9', '', '9', '', '9', '', '9', '', '9', '', '9', '', '9', '', '9', '', '9', '', '9'],
     ['#', '#', '#', '#', '#', '#', '#', '10', '', '10', '', '10', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '11', '', '11', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '12', '#', '#', '#', '#', '#', '#', '#', '#', '#']],

    [['#', '#', '#', '#', '#', '#', '#', '#', '#', '9', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '8', '', '9', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '7', '', '8', '', '9', '#', '#', '#', '#', '#', '#', '#'],
     ['3', '', '4', '', '5', '', '6', '', '7', '', '8', '', '9', '', '10', '', '11', '', '12'],
     ['#', '3', '', '4', '', '5', '', '6', '', '7', '', '8', '', '9', '', '10', '', '11', '#'],
     ['#', '#', '3', '', '4', '', '5', '', '6', '', '7', '', '8', '', '9', '', '10', '#', '#'],
     ['#', '#', '#', '3', '', '4', '', '5', '', '6', '', '7', '', '8', '', '9', '#', '#', '#'],
     ['#', '#', '2', '', '3', '', '4', '', '5', '', '6', '', '7', '', '8', '', '9', '#', '#'],
     ['#', '1', '', '2', '', '3', '', '4', '', '5', '', '6', '', '7', '', '8', '', '9', '#'],
     ['0', '', '1', '', '2', '', '3', '', '4', '', '5', '', '6', '', '7', '', '8', '', '9'],
     ['#', '#', '#', '#', '#', '#', '#', '3', '', '4', '', '5', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '3', '', '4', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '3', '#', '#', '#', '#', '#', '#', '#', '#', '#']],

    [['#', '#', '#', '#', '#', '#', '#', '#', '#', '9', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '9', '', '8', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '9', '', '8', '', '7', '#', '#', '#', '#', '#', '#', '#'],
     ['12', '', '11', '', '10', '', '9', '', '8', '', '7', '', '6', '', '5', '', '4', '', '3'],
     ['#', '11', '', '10', '', '9', '', '8', '', '7', '', '6', '', '5', '', '4', '', '3', '#'],
     ['#', '#', '10', '', '9', '', '8', '', '7', '', '6', '', '5', '', '4', '', '3', '#', '#'],
     ['#', '#', '#', '9', '', '8', '', '7', '', '6', '', '5', '', '4', '', '3', '#', '#', '#'],
     ['#', '#', '9', '', '8', '', '7', '', '6', '', '5', '', '4', '', '3', '', '2', '#', '#'],
     ['#', '9', '', '8', '', '7', '', '6', '', '5', '', '4', '', '3', '', '2', '', '1', '#'],
     ['9', '', '8', '', '7', '', '6', '', '5', '', '4', '', '3', '', '2', '', '1', '', '0'],
     ['#', '#', '#', '#', '#', '#', '#', '5', '', '4', '', '3', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '4', '', '3', '#', '#', '#', '#', '#', '#', '#', '#'],
     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '3', '#', '#', '#', '#', '#', '#', '#', '#', '#']]]

  var targetPositions : number[][][] =
    [[[0,9],[1,8],[1,10],[2,7],[2,9],[2,11],[3,8],[3,10],[3,12],[3,14]],
     [[9,0],[8,1],[9,2],[7,2],[8,3],[9,4],[6,3],[7,4],[8,5],[9,6]],
     [[9,18],[8,17],[9,16],[7,16],[8,15],[9,14],[6,15],[7,14],[8,13],[9,12]]]

  function getDistToTarget (board: Board, targetRow: number, row: number, col: number, playerIndex: number) {
    var rowNoFromTarget = rowNoByPlayer[playerIndex];
    var dist = parseInt(rowNoFromTarget[row][col]) - targetRow;
    return dist > 0? dist : 0;
  }

  function getTargetPosi (board: Board, playerIndex: number): number {
    var targets : number[][] = targetPositions[playerIndex];
    var thisColor = playersMap[playerIndex];
    var targetRow = 0;
    var targetCol = 0;
    for(var i = 0; i<targets.length; i++){
      if(board[targets[i][0]][targets[i][1]] == thisColor){ continue; }
      targetRow = targets[i][0];
      targetCol = targets[i][1];
      break;
    }
    return parseInt(rowNoByPlayer[playerIndex][targetRow][targetCol]);
  }
}
