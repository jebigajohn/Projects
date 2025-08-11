const roundInfo = document.getElementById("round-info") as HTMLParagraphElement
const gameStatus = document.getElementById("game-status") as HTMLHeadingElement
const playerEmoji = document.getElementById("player-emoji") as HTMLDivElement
const cpuEmoji = document.getElementById("cpu-emoji") as HTMLDivElement
const scoreInfo = document.getElementById("score") as HTMLSpanElement
const restartLink = document.getElementById("restart") as HTMLAnchorElement
const buttonsWrap = document.getElementById("buttons") as HTMLDivElement
const roundRadios = document.querySelectorAll<HTMLInputElement>('input[name="rounds"]')
const roundChoice = document.getElementById("round-choice") as HTMLDivElement
const roundCounter = document.getElementById("round-counter") as HTMLParagraphElement
const endHint = document.getElementById("game-end-hint") as HTMLDivElement | null
