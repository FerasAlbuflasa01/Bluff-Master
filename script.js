const playerOneHand = document.querySelector('#player1_hand')
const playedCards = document.querySelector('#discarded_cards')
const playCardsButton = document.querySelector('#play')
class cards {
  constructor(rank, cardImage) {
    this.cardImage = cardImage
    this.rank = rank
    this.backCard = 'cards/backGround.jpg'
  }
  getRank = () => {
    return this.rank
  }
  getCardImage = () => {
    return this.cardImage
  }
  getBackGround = () => {
    return this.backCard
  }
}
class player {
  constructor() {
    this.health = 3
    this.playerHand = []
    this.winCounter = 0
  }
  setWinCounter = (winCounter) => {
    this.winCounter = winCounter
  }

  setPlayerHand = (hand) => {
    this.playerHand = hand
  }

  getPlayerHand = () => {
    return this.playerHand
  }
  getHealth = () => {
    return this.health
  }
  getWinCounter = () => {
    return this.winCounter
  }
  decrmentHealth = () => {
    this.health--
  }
  restPlayer = () => {
    this.health = 3
    this.playerHand = []
    this.winCounter = 0
  }
}
playCardsButton.addEventListener(() => {
  console.log(playedCards)
})
