
export const generateNewBoard = () => [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]

  export const deepCloneBoard = (board:any) => [
    [...board[0]],
    [...board[1]],
    [...board[2]],
    [...board[3]],
    [...board[4]],
    [...board[5]],
    [...board[6]],
    [...board[7]]
  ]
  
  // for real tho...all credit for this super optimized logic belongs here: Jeff Leu circa November 23, 2016
  const checkVertical = (board:any) => {
    // Check only if row is 3 or greater
    for (let r = 3; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            const data = {playerWon:board[r][c], winningCombination:[[r, c],[r-1, c], [r-2, c], [r-3, c]]};
            return data;
          }
        }
      }
    }
  }
  
  const checkHorizontal = (board:any) => {
    // Check only if column is 3 or less
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            const data = {playerWon:board[r][c], winningCombination:[[r, c],[r, c+1], [r, c+2], [r, c+3]]};
            return data;
          }
        }
      }
    }
  }
  
  const checkDiagonalRight = (board:any) => {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 8; r++) {
      for (let c = 0; c < 8; c++) { //4->8
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            const data = {playerWon:board[r][c], winningCombination:[[r, c],[r-1, c+1], [r-2, c+2], [r-3, c+3]]};
            return data;
          }
        }
      }
    }
  }
  
  const checkDiagonalLeft = (board:any) => {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 8; r++) {
      for (let c = 3; c < 8; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            const data = {playerWon:board[r][c], winningCombination:[[r, c],[r-1, c-1], [r-2, c-2], [r-3, c-3]]};
            return data;
          }
        }
      }
    }
  }
  
  const checkDraw = (board:any) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === null) {
          return null
        }
      }
    }
    // return 'draw'
  }
  
  export const checkForWin = (board:any) => {
    return (
      checkVertical(board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board) ||
      checkHorizontal(board) ||
      checkDraw(board)
    )
  }