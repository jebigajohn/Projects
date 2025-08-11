let totalRounds = 0
let currentRound = 0
let userScore = 0
let cpuScore = 0
let gameOver = false

function enableMoveButtons(enable: boolean) {
  buttonsWrap.querySelectorAll("button").forEach((b) => ((b as HTMLButtonElement).disabled = !enable))
}
enableMoveButtons(false)

roundRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    totalRounds = parseInt(radio.value, 10)
    currentRound = 1
    roundChoice.style.display = "none"
    roundCounter.style.display = "block"
    roundCounter.textContent = `${currentRound}/${totalRounds}`
    gameStatus.textContent = "Let´s play"
    userScore = 0
    cpuScore = 0
    updateScore()
    clearEmojis()
    gameOver = false
    enableMoveButtons(true)
  })
})

function updateScore() {
  scoreInfo.textContent = `${userScore} : ${cpuScore}`
}

function clearEmojis() {
  playerEmoji.textContent = ""
  cpuEmoji.textContent = ""
}

function getCpuMove(): Move {
  const list: Move[] = ["rock", "paper", "scissors"]
  return list[Math.floor(Math.random() * list.length)]
}

function decide(user: Move, cpu: Move): Result {
  if (user === cpu) return "draw"
  const wins: Record<Move, Move> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  }
  return wins[user] === cpu ? "win" : "lose"
}

function emojiFor(move: Move) {
  return move === "rock" ? "✊" : move === "paper" ? "✋" : "✌️"
}

buttonsWrap.addEventListener("click", (e) => {
  if (gameOver) return
  const target = e.target as HTMLElement
  if (target.tagName !== "BUTTON") return

  const btn = target as HTMLButtonElement
  const userMove = btn.dataset.move as Move
  if (!userMove || currentRound === 0) return

  enableMoveButtons(false)
  const cpuMove = getCpuMove()

  // Emojis anzeigen
  playerEmoji.textContent = emojiFor(userMove)
  cpuEmoji.textContent = emojiFor(cpuMove)

  // Ergebnis
  const result = decide(userMove, cpuMove)
  applyRoundResult(result, userMove, cpuMove)

  if (currentRound >= totalRounds) {
    finishGame()
    return
  }
  currentRound++
  roundCounter.textContent = `${currentRound}/${totalRounds}`
  enableMoveButtons(true)
})

function applyRoundResult(result: Result, user: Move, cpu: Move) {
  if (result === "draw") {
    gameStatus.textContent = `It was a draw! You both chose ${capitalize(user)}`
  } else if (result === "win") {
    userScore++
    gameStatus.textContent = `${capitalize(user)} beats ${capitalize(cpu)}. You win!`
  } else {
    cpuScore++
    gameStatus.textContent = `${capitalize(cpu)} beats ${capitalize(user)}. You lose!`
  }
  updateScore()
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const endHint = document.getElementById("game-end-hint") as HTMLDivElement | null

function finishGame() {
  gameOver = true
  enableMoveButtons(false)

  if (userScore > cpuScore) {
    gameStatus.textContent = "You win. Play again?"
  } else if (userScore < cpuScore) {
    gameStatus.textContent = "You lose. Try again"
  } else {
    gameStatus.textContent = "Draw. Try again"
  }

  if (endHint) {
    endHint.style.display = "block"
    endHint.classList.add("bounce")
  }
}

restartLink.addEventListener("click", (e) => {
  e.preventDefault()
  totalRounds = 0
  currentRound = 0
  userScore = 0
  cpuScore = 0
  gameOver = false

  updateScore()
  clearEmojis()
  roundInfo.textContent = "How many rounds?"
  gameStatus.textContent = "Let´s play"
  enableMoveButtons(false)

  if (endHint) {
    endHint.style.display = "none"
    endHint.classList.remove("bounce")
  }

  roundRadios.forEach((r) => (r.checked = false))
  roundChoice.style.display = "grid"
  roundCounter.style.display = "none"
})
