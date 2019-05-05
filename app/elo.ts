type MyGameResult = 0 | 0.5 | 1

function getRatingDelta(
  myRating: number,
  opponentRating: number,
  myGameResult: MyGameResult
): number {
  var myChanceToWin = 1 / (1 + Math.pow(10, (opponentRating - myRating) / 400))

  return Math.round(32 * (myGameResult - myChanceToWin))
}

function getNewRating(
  myRating: number,
  opponentRating: number,
  myGameResult: MyGameResult
): number {
  return myRating + getRatingDelta(myRating, opponentRating, myGameResult)
}

export { getRatingDelta, getNewRating }
